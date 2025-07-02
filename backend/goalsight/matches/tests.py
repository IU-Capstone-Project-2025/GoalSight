from django.test import TestCase
from matches.models import Match
from teams.models import Team
from matches.serializers import MatchSerializer
from rest_framework.test import APITestCase
from django.urls import reverse

class MatchModelTest(TestCase):
    def setUp(self):
        self.team_a = Team.objects.create(name="Team A", country="Country A", coach="Coach A", market_value=1.0, avg_age=25.0,
                                            last_5_matches_wdl=["W","D","L","W","W"], xG=1.2, ball_possession=55.0,
                                            shots_on_target=5, big_chances_created=3)
        self.team_b = Team.objects.create(name="Team B", country="Country B", coach="Coach B", market_value=1.1, avg_age=26.0,
                                            last_5_matches_wdl=["L","L","W","D","W"], xG=1.0, ball_possession=50.0,
                                            shots_on_target=4, big_chances_created=2)
    def test_create_match(self):
        match = Match.objects.create(home_team=self.team_a, away_team=self.team_b, date="2026-06-18")
        self.assertEqual(match.home_team, self.team_a)
        self.assertEqual(match.away_team, self.team_b)
        self.assertEqual(str(match.date), "2026-06-18")

class MatchSerializerTest(TestCase):
    def setUp(self):
        self.team_a = Team.objects.create(name="Team A", country="Country A", coach="Coach A", market_value=1.0, avg_age=25.0,
                                            last_5_matches_wdl=["W","D","L","W","W"], xG=1.2, ball_possession=55.0,
                                            shots_on_target=5, big_chances_created=3)
        self.team_b = Team.objects.create(name="Team B", country="Country B", coach="Coach B", market_value=1.1, avg_age=26.0,
                                            last_5_matches_wdl=["L","L","W","D","W"], xG=1.0, ball_possession=50.0,
                                            shots_on_target=4, big_chances_created=2)

    def test_serializer_fields(self):
        match = Match.objects.create(home_team=self.team_a, away_team=self.team_b, date="2026-06-18")
        serializer = MatchSerializer(match)
        expected_fields = {'id', 'home_team', 'away_team', 'date'}
        self.assertEqual(set(serializer.data.keys()), expected_fields)

    def test_missing_field(self):
        data = {
            "date": "2024-06-01",
            "home_team": self.team_a
        }
        serializer = MatchSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("away_team", serializer.errors)

    def test_invalid_date(self):
        data = {
            "home_team": self.team_a.id,
            "away_team": self.team_b.id,
            "date": "invalid-date"
        }
        serializer = MatchSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("date", serializer.errors)

class MatchesViewTest(APITestCase):
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
            big_chances_created=3
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
            big_chances_created=2
        )
        self.match = Match.objects.create(
            home_team=self.team_a,
            away_team=self.team_b,
            date="2025-07-01",
            home=1.5,
            away=2.5,
            draw=3.0
        )

    # def test_matches_list(self):
    #     url = reverse('matches-list')
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, 200)
    #     results = response.json()
    #     self.assertTrue(len(results) > 0)
    #     first_match = results[0]
    #     expected_keys = {'id', 'home_team', 'away_team', 'date'}
    #     self.assertTrue(expected_keys.issubset(first_match.keys()))

    def test_invalid_date_format(self):
        url = reverse('matches-list')
        response = self.client.get(url, {'date': '2025-13-40'})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Invalid date format. Use YYYY-MM-DD.')
