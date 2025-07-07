import os
import sys
import pytest
import django

proj_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(proj_root)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'goalsight.settings')
django.setup()

# import class for loading and prediction (GoalSight/backend/goalsight/predictions/ml_service.py)
from predictions.ml_service import prediction_service

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

@pytest.fixture(scope="module")
def model_service():
    return prediction_service

def test_model_loading(model_service):
    assert model_service.model is not None, "Model has not been loaded"
    assert isinstance(model_service.features, list), "Features must be a list"
    assert isinstance(model_service.class_mapping, dict), "class_mapping must be a dict"
    assert len(model_service.features) > 0, "Features list is empty"

def test_prediction_success(model_service):
    result = model_service.predict(test_features)
    assert 'error' not in result, f"Unexpected error: {result.get('error')}"
    expected_keys = {'home_win', 'away_win'}
    assert set(result.keys()) >= expected_keys, \
        f"Result keys {set(result.keys())} != expected {expected_keys}"
    home_p = result['home_win']
    away_p = result['away_win']
    assert isinstance(home_p, float) and isinstance(away_p, float)
    assert pytest.approx(home_p + away_p, rel=1e-6) == 1.0, \
        "Probabilities do not sum to 1"
    assert 0.0 <= home_p <= 1.0
    assert 0.0 <= away_p <= 1.0


# ------- Input checks ------
# @pytest.mark.parametrize("bad_input", [
#     {},                                    # пустой словарь
#     {'stage': 1},                          # недостаточно полей
#     {'stage': 1, 'season_encoded': 'foo'}  # неверный тип
# ])


# def test_prediction_invalid_input(model_service, bad_input):
#     """
#     Проверяет, что при некорректном вводе возвращается ошибка.
#     """
#     res = model_service.predict(bad_input)
#     assert 'error' in res, f"Expected error for input {bad_input!r}, got {res}"