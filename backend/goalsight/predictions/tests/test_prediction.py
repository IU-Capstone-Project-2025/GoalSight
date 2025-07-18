import pytest

# import class for loading and prediction (GoalSight/backend/goalsight/predictions/ml_service.py)
from predictions.ml_service import prediction_service

test_features = {
    "date":1,
    "away_win_odd":1,
    "home_win_odd":1,
    "away_avg_age":1,
    "away_goal_avg_last_5":1,
    "away_avg_shots_on_target_last_5":1,
    "away_avg_xG_last_5":1,
    "away_avg_xGA_last_5":1,
    "away_days_since_last_game":1,
    "away_elo_rating":1,
    "away_glicko2_rating":2 ,
    "away_market_value":2 ,
    "away_matches_14_days":2 ,
    "away_rd":2 ,
    "away_volatility":2 ,
    "home_avg_age":2 ,
    "home_goal_avg_last_5":2 ,
    "home_avg_shots_on_target_last_5":1,
    "home_avg_xG_last_5":2 ,
    "home_avg_xGA_last_5":2 ,
    "home_days_since_last_game":1,
    "home_elo_rating":2 ,
    "home_glicko2_rating":2 ,
    "home_market_value":2 ,
    "home_matches_14_days":1,
    "home_rd":2 ,
    "home_volatility":2 ,
    "league_strength_away":2 ,
    "league_strength_home":1,
    "team_strength_away":2 ,
    "team_strength_home":2 ,
    "home_wins_last_5":2 ,
    "away_wins_last_5":2 ,
    "home_losses_last_5":1,
    "away_losses_last_5":2 ,
    "home_draws_last_5":2 ,
    "away_draws_last_5":1,
    "home_att_vs_diff":2 ,
    "away_att_vs_diff":1
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