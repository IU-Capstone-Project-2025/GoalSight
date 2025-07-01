from django.test import TestCase
from predictions.serializers import MatchPredictionSerializer
from rest_framework.test import APITestCase
from django.urls import reverse
from teams.models import Team
from matches.models import Match
from unittest.mock import patch

class PredictionSerializerTest(TestCase):
    def test_valid_prediction(self):
        data = {
            "prediction": "home_win",
            "confidence": 0.85,
            "probabilities": {
                "home_win": 0.85,
                "away_win": 0.10,
                "draw": 0.05
            },
            "model_type": "logistic_regression",
            "model_accuracy": 0.92
        }
        serializer = MatchPredictionSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data["prediction"], "home_win")

class PredictMatchAPITest(APITestCase):
    def setUp(self):
        self.team_a = Team.objects.create(
            name="Team A",
            country="Country A",
            coach="Coach A",
            market_value=1.0,
            avg_age=25.0,
            last_5_matches_wdl=["W","D","L","W","W"],
            xG=1.2,
            ball_possession=55.0,
            shots_on_target=5,
            big_chances_created=3,
            buildUpPlaySpeed=50,
            buildUpPlayPassing=60,
            chanceCreationPassing=70,
            chanceCreationCrossing=40,
            chanceCreationShooting=65,
            defencePressure=55,
            defenceAggression=60,
            defenceTeamWidth=45
        )
        self.team_b = Team.objects.create(
            name="Team B",
            country="Country B",
            coach="Coach B",
            market_value=1.1,
            avg_age=26.0,
            last_5_matches_wdl=["L","L","W","D","W"],
            xG=1.0,
            ball_possession=50.0,
            shots_on_target=4,
            big_chances_created=2,
            buildUpPlaySpeed=48,
            buildUpPlayPassing=58,
            chanceCreationPassing=67,
            chanceCreationCrossing=42,
            chanceCreationShooting=60,
            defencePressure=53,
            defenceAggression=62,
            defenceTeamWidth=47
        )
        self.match = Match.objects.create(
            home_team=self.team_a,
            away_team=self.team_b,
            date="2025-07-01",
            home=1.5,
            away=2.5,
            draw=3.0
        )
        self.url = reverse('predict-match')  

    @patch('goalsight.predictions.views.prediction_service.predict')
    def test_predict_match_success(self, mock_predict):
        mock_predict.return_value = {'win_prob': 0.7, 'draw_prob': 0.2, 'lose_prob': 0.1}

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
        data = {
            "home_team": "Team A"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Both home_team and away_team are required.')

    def test_invalid_json(self):
        response = self.client.post(self.url, data="not a json", content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Bad JSON')

    def test_team_not_found(self):
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
        mock_predict.side_effect = Exception("Model failure")
        data = {
            "home_team": "Team A",
            "away_team": "Team B"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 500)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Model failure')
