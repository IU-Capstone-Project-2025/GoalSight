from django.test import TestCase
from django.utils.timezone import make_aware
from datetime import datetime
from rest_framework.test import APITestCase
from rest_framework import status
from django.utils.dateparse import parse_datetime
from django.urls import reverse

from matches.models import Match
from teams.models import Team
from matches.serializers import MatchSerializer


def create_team(name):
    return Team.objects.create(
        name=name,
        country="Testland",
        market_value=1.0,
        avg_age=25.0,
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
        logo_url_32=f"http://example.com/logo32_{name}.png",
        logo_url_64=f"http://example.com/logo64_{name}.png",
    )


class MatchModelTest(TestCase):
    def setUp(self):
        self.team_a = create_team("Team A")
        self.team_b = create_team("Team B")

    def test_create_match(self):
        dt = make_aware(datetime(2026, 6, 18, 0, 0, 0))
        match = Match.objects.create(home_team=self.team_a, away_team=self.team_b, date=dt)
        self.assertEqual(match.home_team, self.team_a)
        self.assertEqual(match.away_team, self.team_b)
        self.assertEqual(match.date, dt)


class MatchSerializerTest(TestCase):
    def setUp(self):
        self.team_a = create_team("Team A")
        self.team_b = create_team("Team B")

    def test_match_serializer(self):
        dt = make_aware(datetime(2025, 7, 1, 15, 30))
        match = Match.objects.create(home_team=self.team_a, away_team=self.team_b, date=dt)
        serializer = MatchSerializer(match)
        data = serializer.data

        self.assertEqual(data['home_team'], self.team_a.name)
        self.assertEqual(data['away_team'], self.team_b.name)
        self.assertEqual(parse_datetime(data['date']), match.date)


class MatchesViewTest(APITestCase):
    def setUp(self):
        self.team_a = create_team("Team A")
        self.team_b = create_team("Team B")
        self.dt = make_aware(datetime(2025, 7, 1, 15, 30))
        self.match = Match.objects.create(
            home_team=self.team_a,
            away_team=self.team_b,
            date=self.dt,
            home=1.5,
            away=2.5,
        )

    def test_matches_list_view(self):
        url = reverse("matches-list")  # Имя должно быть определено в urls.py
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)
        self.assertGreaterEqual(len(response.data), 1)

        match_data = response.data[0]
        self.assertEqual(match_data['home_team'], self.team_a.name)
        self.assertEqual(match_data['away_team'], self.team_b.name)