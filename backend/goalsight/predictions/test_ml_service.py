import os
import sys
import django

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'goalsight.settings')
django.setup()

from ml_service import prediction_service


def test_model_loading():
    print("=== Test of model loading ===")

    if prediction_service.model is not None:
        print("YES Model loaded")
        print(f"YES Number of features: {len(prediction_service.features)}")
        print(f"YES Type of model: {type(prediction_service.model)}")
        print(f"YES Classes: {prediction_service.class_mapping}")
        return True
    else:
        print("!!!FAILED Model has not been loaded")
        return False


def test_prediction():
    print("\n=== Test of prediction ===")

    # test data
    test_features = {
        'stage': 1,
        'season_encoded': 2024,
        'home_buildUpPlaySpeed': 50,
        'away_buildUpPlaySpeed': 45,
        'B365H': 2.5,
        'B365D': 3.2,
        'B365A': 2.8,
        'home_defencePressure': 60,
        'away_defencePressure': 55,
        'home_chanceCreationPassing': 70,
        'away_chanceCreationPassing': 65
    }


    result = prediction_service.predict(test_features)

    if 'error' in result:
        print(f"!!!FAILED Error: {result['error']}")
        return False
    else:
        print("YES Prediction:")
        print(f"   Result: {result['prediction']}")
        print(f"   Probability: {result['probabilities']}")
        print(f"   Confidence: {result['confidence']:.3f}")
        return True


if __name__ == "__main__":
    print("Start tests of ML service...")

    model_loaded = test_model_loading()

    if model_loaded:
        prediction_works = test_prediction()

    print("\n=== Test results ===")
    print(f"Model uploading: {'YES' if model_loaded else '!!!FAILED'}")
    print(f"Prediction: {'YES' if model_loaded and prediction_works else '!!!FAILED'}")
