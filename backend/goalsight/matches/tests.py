from django.test import TestCase
from matches.models import Match
from teams.models import Team
from matches.serializers import MatchSerializer
from rest_framework.test import APITestCase
from django.urls import reverse
from datetime import datetime
from django.utils.timezone import make_aware

class MatchModelTest(TestCase):
    def setUp(self):
        self.team_a = Team.objects.create(name="Team A", country="Country A", coach="Coach A", market_value=1.0, avg_age=25.0,
                                            last_5_matches_wdl=["W","D","L","W","W"], xG=1.2, ball_possession=55.0,
                                            shots_on_target=5, big_chances_created=3)
        self.team_b = Team.objects.create(name="Team B", country="Country B", coach="Coach B", market_value=1.1, avg_age=26.0,
                                            last_5_matches_wdl=["L","L","W","D","W"], xG=1.0, ball_possession=50.0,
                                            shots_on_target=4, big_chances_created=2)
    def test_create_match(self):
        dt = make_aware(datetime(2026, 6, 18, 0, 0, 0))
        match = Match.objects.create(home_team=self.team_a, away_team=self.team_b, date=dt)
        self.assertEqual(match.home_team, self.team_a)
        self.assertEqual(match.away_team, self.team_b)
        self.assertEqual(match.date, dt)

class MatchSerializerTest(TestCase):
    def setUp(self):
        self.team_a = Team.objects.create(name="Team A", country="Country A", coach="Coach A", market_value=1.0, avg_age=25.0,
                                            last_5_matches_wdl=["W","D","L","W","W"], xG=1.2, ball_possession=55.0,
                                            shots_on_target=5, big_chances_created=3)
        self.team_b = Team.objects.create(name="Team B", country="Country B", coach="Coach B", market_value=1.1, avg_age=26.0,
                                            last_5_matches_wdl=["L","L","W","D","W"], xG=1.0, ball_possession=50.0,
                                            shots_on_target=4, big_chances_created=2)

    def test_serializer_fields(self):
        dt = make_aware(datetime(2026, 6, 18, 0, 0, 0))
        match = Match.objects.create(home_team=self.team_a, away_team=self.team_b, date=dt)
        serializer = MatchSerializer(match)
        expected_fields = {'id', 'home_team', 'away_team', 'date'}
        self.assertEqual(set(serializer.data.keys()), expected_fields)
        self.assertEqual(serializer.data['date'], dt.isoformat())

    def test_missing_field(self):
        data = {
            "date": make_aware(datetime(2024, 6, 1, 0, 0)).isoformat(),
            "home_team": self.team_a.id
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
        dt = make_aware(datetime(2025, 7, 1, 15, 30))
        self.match = Match.objects.create(
            home_team=self.team_a,
            away_team=self.team_b,
            date=dt,
            home=1.5,
            away=2.5,
            draw=3.0
        )

    def test_invalid_date_format(self):
        url = reverse('matches-list')
        response = self.client.get(url, {'date': '2025-13-40T25:61:61Z'})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)
        self.assertTrue('Invalid date format' in response.data['error'])