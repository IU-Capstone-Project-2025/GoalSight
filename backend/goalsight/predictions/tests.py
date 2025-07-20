from django.test import TestCase
from predictions.serializers import MatchPredictionSerializer
from rest_framework.test import APITestCase
from django.urls import reverse
from teams.models import Team
from matches.models import Match
from unittest.mock import patch

class PredictionSerializerTest(TestCase):
    """
    Test case for the MatchPredictionSerializer.
    """
    def test_valid_prediction(self):
        """
        Test serializer with valid prediction data.
        """
        data = {
            "home_win": 0.85,
            "away_win": 0.10,
            "logo_url_64_home": "http://example.com/logo_home.png",
            "logo_url_64_away": "http://example.com/logo_away.png"
        }
        serializer = MatchPredictionSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data["home_win"], 0.85)
        self.assertEqual(serializer.validated_data["away_win"], 0.10)
        self.assertEqual(serializer.validated_data["logo_url_64_home"], "http://example.com/logo_home.png")
        self.assertEqual(serializer.validated_data["logo_url_64_away"], "http://example.com/logo_away.png")

class PredictMatchAPITest(APITestCase):
    """
    Test case for the predict_match API endpoint.
    """
    def setUp(self):
        self.team_a = Team.objects.create(
            name="Team A",
            logo_url_32="http://example.com/logo32a.png",
            logo_url_64="http://example.com/logo64a.png",
            country="Testland",
            market_value=123.45,
            avg_age=27.5,
            api_id=1,
            team_strength=90.0,
            league_strength=85.0,
            glicko2_rating=1700.0,
            rd=80.0,
            volatility=0.06,
            elo_rating=1750.0,
            wins_last_5=3,
            draws_last_5=1,
            losses_last_5=1,
            goal_avg_last_5=1.8,
            avg_shots_on_target_last_5=5.0,
            avg_xG_last_5=1.5,
            avg_xGA_last_5=1.2,
            days_since_last_game=5,
            matches_14_days=3,
        )
        self.team_b = Team.objects.create(
            name="Team B",
            logo_url_32="http://example.com/logo32b.png",
            logo_url_64="http://example.com/logo64b.png",
            country="Testland",
            market_value=120.0,
            avg_age=26.0,
            api_id=2,
            team_strength=80.0,
            league_strength=75.0,
            glicko2_rating=1600.0,
            rd=70.0,
            volatility=0.05,
            elo_rating=1650.0,
            wins_last_5=2,
            draws_last_5=2,
            losses_last_5=1,
            goal_avg_last_5=1.2,
            avg_shots_on_target_last_5=4.0,
            avg_xG_last_5=1.1,
            avg_xGA_last_5=1.3,
            days_since_last_game=7,
            matches_14_days=2,
        )
        self.match = Match.objects.create(
            home_team=self.team_a,
            away_team=self.team_b,
            date="2025-07-01",
            home=1.5,
            away=2.5,
        )
        self.url = reverse('predict-match')  

    @patch('goalsight.predictions.views.prediction_service.predict')
    def test_predict_match_success(self, mock_predict):
        """
        Test successful prediction API response.
        """
        mock_predict.return_value = {
            "home_win": 0.7,
            "away_win": 0.2,
            "logo_url_64_home": "http://example.com/logo_home.png",
            "logo_url_64_away": "http://example.com/logo_away.png"
        }

        data = {
            "home_team": "Team A",
            "away_team": "Team B"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('win_prob', response.json())
        self.assertIn('draw_prob', response.json())
        self.assertIn('lose_prob', response.json())

    def test_missing_fields(self):
        """
        Test API response for missing required fields.
        """
        data = {
            "home_team": "Team A"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Both home_team and away_team are required.')

    def test_invalid_json(self):
        """
        Test API response for invalid JSON body.
        """
        response = self.client.post(self.url, data="not a json", content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Bad JSON')

    def test_team_not_found(self):
        """
        Test API response when a team is not found.
        """
        data = {
            "home_team": "Nonexistent Team",
            "away_team": "Team B"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'One or both teams not found.')

    @patch('goalsight.predictions.views.prediction_service.predict')
    def test_prediction_service_exception(self, mock_predict):
        """
        Test API response when the prediction service raises an exception.
        """
        mock_predict.side_effect = Exception("Model failure")
        data = {
            "home_team": "Team A",
            "away_team": "Team B"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 500)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Model failure')
