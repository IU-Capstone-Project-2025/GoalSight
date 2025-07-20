import joblib
import json
import numpy as np
from django.conf import settings
import os
import pandas as pd

class PredictionService:
    """
       A comprehensive service class for soccer match outcome prediction using machine learning.

       This class handles:
       - Loading pre-trained models and preprocessors
       - Feature processing and transformation
       - Match outcome predictions with probabilities
       - Error handling and validation

       Attributes:
           model: Trained machine learning model (Logistic Regression)
           preprocessor: Data preprocessing pipeline (StandardScaler + PCA)
           features: List of expected input features
           class_mapping: Mapping from prediction labels to model classes
           reverse_mapping: Mapping from model classes to prediction labels
       """
    def __init__(self):
        """
            Initialize the PredictionService with empty model components.
            Automatically loads the trained model and preprocessor.
        """
        self.model = None
        self.preprocessor = None
        self.features = None
        self.class_mapping = None
        self.reverse_mapping = None
        # Load the pre-trained model and components
        self.load_model()

    def load_model(self):
        """
            Load the pre-trained machine learning model and all associated components.

            This method loads:
            - Trained Logistic Regression model
            - Preprocessing pipeline (StandardScaler + PCA)
            - Feature list for input validation
            - Class mapping for label conversion

            The model files are expected to be in the 'ml_models' directory within BASE_DIR.
        """
        try:
            # Define file paths for model components
            model_path = os.path.join(settings.BASE_DIR, 'ml_models', 'model.pkl')
            preprocessor_path = os.path.join(settings.BASE_DIR, 'ml_models', 'preprocessor.pkl')
            features_path = os.path.join(settings.BASE_DIR, 'ml_models', 'features.json')
            mapping_path = os.path.join(settings.BASE_DIR, 'ml_models', 'class_mapping.json')
            # Load the trained model (Logistic Regression)
            self.model = joblib.load(model_path)
            # Load the preprocessing pipeline (StandardScaler + PCA)
            self.preprocessor = joblib.load(preprocessor_path)
            # Load the list of expected input features
            with open(features_path, 'r') as f:
                self.features = json.load(f)
            # Load class mapping for converting predictions to labels
            with open(mapping_path, 'r') as f:
                self.class_mapping = json.load(f)
            # Create reverse mapping for label conversion
            self.reverse_mapping = {v: k for k, v in self.class_mapping.items()}
            print("Logistic Regression model and preprocessor loaded!")
            print(f"Number of input features: {len(self.features)}")
        except Exception as e:
            print(f"Error of model loading: {e}")
            self.model = None
            self.preprocessor = None

    def predict(self, features_dict):
        """
            Predict soccer match outcome based on input features.

            Args:
                features_dict (dict): Dictionary containing match features including:
                    - Team tactical attributes (home/away)
                    - Player embeddings and statistics
                    - Historical performance data

            Returns:
                dict: Prediction results containing:
                     - home_win (float): Probability of home team winning
                    - away_win (float): Probability of away team winning
                    - prediction_label (str): Predicted match outcome
                    OR
                    - error (str): Error message if prediction fails

            Note:
                The model expects exactly the same features used during training.
                Input features are automatically scaled and reduced using PCA.
        """
        # Validate that model and preprocessor are loaded
        if self.model is None or self.preprocessor is None:
            return {"error": "The model or preprocessor has not been loaded"}
        try:
            # Convert input dictionary to DataFrame for processing
            input_df = pd.DataFrame([features_dict])
            # Ensure features are in the correct order as expected by the model
            input_df = input_df[self.features]

            # Apply preprocessing pipeline (StandardScaler + PCA transformation)
            # This transforms the input to match the training data format
            features_processed = self.preprocessor.transform(input_df.values)
            # Generate prediction using the trained model
            prediction = self.model.predict(features_processed)[0]
            probabilities = self.model.predict_proba(features_processed)[0]
            # home_win_prob_index = np.where(self.model.classes_ == 1)[0][0]
            # away_win_prob_index = np.where(self.model.classes_ == 0)[0][0]
            prediction_label = self.reverse_mapping[prediction]
            return {
                'home_win': float(probabilities[1]),
                'away_win': float(probabilities[0]),
            }
        except Exception as e:
            return {"error": f"Prediction error: {str(e)}"}

prediction_service = PredictionService()