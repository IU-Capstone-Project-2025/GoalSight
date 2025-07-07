import joblib
import json
import numpy as np
from django.conf import settings
import os

class PredictionService:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.features = None
        self.class_mapping = None
        self.reverse_mapping = None
        self.load_model()

    def load_model(self):
        try:
            model_path = os.path.join(settings.BASE_DIR, 'ml_models', 'model.pkl')
            scaler_path = os.path.join(settings.BASE_DIR, 'ml_models', 'scaler.pkl')
            features_path = os.path.join(settings.BASE_DIR, 'ml_models', 'features.json')
            mapping_path = os.path.join(settings.BASE_DIR, 'ml_models', 'class_mapping.json')
            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)
            with open(features_path, 'r') as f:
                self.features = json.load(f)
            with open(mapping_path, 'r') as f:
                self.class_mapping = json.load(f)
                self.reverse_mapping = {v: k for k, v in self.class_mapping.items()}
            print("Logistic Regression model loaded!")
            print(f"Number of features: {len(self.features)}")
        except Exception as e:
            print(f"Error of model loading: {e}")
            self.model = None
    def predict(self, features_dict):
        if self.model is None:
            return {"error": "The model has not been loaded"}
        try:
            features_array = []
            for feature_name in self.features:
                if feature_name in features_dict:
                    features_array.append(features_dict[feature_name])
                else:
                    features_array.append(0.0)  # Значение по умолчанию
            features_array = np.array(features_array).reshape(1, -1)
            features_scaled = self.scaler.transform(features_array)
            prediction = self.model.predict(features_scaled)[0]
            probabilities = self.model.predict_proba(features_scaled)[0]
            prediction_label = self.reverse_mapping[prediction]
            return {
                'home_win': float(probabilities[0]),
                'away_win': float(probabilities[1])
            }
        except Exception as e:
            return {"error": f"Prediction error: {str(e)}"}

prediction_service = PredictionService()