import joblib
import json
import numpy as np
from django.conf import settings
import os
import pandas as pd

class PredictionService:
    def __init__(self):
        self.model = None
        self.preprocessor = None
        self.features = None
        self.class_mapping = None
        self.reverse_mapping = None
        self.load_model()

    def load_model(self):
        try:
            model_path = os.path.join(settings.BASE_DIR, 'ml_models', 'model.pkl')
            preprocessor_path = os.path.join(settings.BASE_DIR, 'ml_models', 'preprocessor.pkl')
            features_path = os.path.join(settings.BASE_DIR, 'ml_models', 'features.json')
            mapping_path = os.path.join(settings.BASE_DIR, 'ml_models', 'class_mapping.json')
            self.model = joblib.load(model_path)
            self.preprocessor = joblib.load(preprocessor_path)
            with open(features_path, 'r') as f:
                self.features = json.load(f)
            with open(mapping_path, 'r') as f:
                self.class_mapping = json.load(f)
            self.reverse_mapping = {v: k for k, v in self.class_mapping.items()}
            print("Logistic Regression model and preprocessor loaded!")
            print(f"Number of input features: {len(self.features)}")
        except Exception as e:
            print(f"Error of model loading: {e}")
            self.model = None
            self.preprocessor = None

    def predict(self, features_dict, url_64_home, url_64_away):
        if self.model is None or self.preprocessor is None:
            return {"error": "The model or preprocessor has not been loaded"}
        try:
            input_df = pd.DataFrame([features_dict])
            input_df = input_df[self.features]
            features_processed = self.preprocessor.transform(input_df.values)
            # The model expects input data after PCA (10 components)
            prediction = self.model.predict(features_processed)[0]
            probabilities = self.model.predict_proba(features_processed)[0]
            # home_win_prob_index = np.where(self.model.classes_ == 1)[0][0]
            # away_win_prob_index = np.where(self.model.classes_ == 0)[0][0]
            prediction_label = self.reverse_mapping[prediction]
            return {
                'home_win': float(probabilities[0]),
                'away_win': float(probabilities[1]),
                'logo_url_64_home': url_64_home,
                'logo_url_64_away': url_64_away
            }
        except Exception as e:
            return {"error": f"Prediction error: {str(e)}"}

prediction_service = PredictionService()