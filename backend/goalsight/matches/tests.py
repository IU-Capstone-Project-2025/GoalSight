from django.test import TestCase
from matches.models import Match
from teams.models import Team
from matches.serializers import MatchSerializer
from rest_framework.test import APITestCase
from django.urls import reverse
from datetime import datetime
from django.utils.timezone import make_aware
from dateutil.parser import isoparse

class MatchModelTest(TestCase):
    """
    Test case for the Match model.
    """
    def setUp(self):
        self.team_a = Team.objects.create(
            name="Team A",
            country="Country A",
            market_value=1.0,
            avg_age=25.0,
            xG=1.2,
            buildUpPlaySpeed=50,
            buildUpPlayPassing=60,
            chanceCreationPassing=70,
            chanceCreationCrossing=40,
            chanceCreationShooting=65,
            defencePressure=55,
            defenceAggression=60,
            defenceTeamWidth=45,
            team_strength=90.0,
            league_strength=85.0,
            glicko2_rating=1700.0,
            elo_rating=1750.0,
            wins_last_5=3,
            losses_last_5=1,
            drawns_last_5=1,
            goal_avg_last_5=1.8,
            avg_xG_last_5=1.5,
            avg_xGA_last_5=1.2,
            days_since_last_game=5,
            matches_14_days=3,
        )
        self.team_b = Team.objects.create(
            name="Team B",
            country="Country B",
            market_value=1.1,
            avg_age=26.0,
            xG=1.0,
            buildUpPlaySpeed=48,
            buildUpPlayPassing=58,
            chanceCreationPassing=67,
            chanceCreationCrossing=42,
            chanceCreationShooting=60,
            defencePressure=53,
            defenceAggression=62,
            defenceTeamWidth=47,
            team_strength=80.0,
            league_strength=75.0,
            glicko2_rating=1600.0,
            elo_rating=1650.0,
            wins_last_5=2,
            losses_last_5=2,
            drawns_last_5=1,
            goal_avg_last_5=1.2,
            avg_xG_last_5=1.1,
            avg_xGA_last_5=1.3,
            days_since_last_game=7,
            matches_14_days=2,
        )
    def test_create_match(self):
        """
        Test creating a Match instance.
        """
        dt = make_aware(datetime(2026, 6, 18, 0, 0, 0))
        match = Match.objects.create(home_team=self.team_a, away_team=self.team_b, date=dt)
        self.assertEqual(match.home_team, self.team_a)
        self.assertEqual(match.away_team, self.team_b)
        self.assertEqual(match.date, dt)

class MatchSerializerTest(TestCase):
    """
    Test case for the MatchSerializer.
    """
    def setUp(self):
        self.team_a = Team.objects.create(
            name="Team A",
            country="Country A",
            market_value=1.0,
            avg_age=25.0,
            xG=1.2,
            buildUpPlaySpeed=50,
            buildUpPlayPassing=60,
            chanceCreationPassing=70,
            chanceCreationCrossing=40,
            chanceCreationShooting=65,
            defencePressure=55,
            defenceAggression=60,
            defenceTeamWidth=45,
            team_strength=90.0,
            league_strength=85.0,
            glicko2_rating=1700.0,
            elo_rating=1750.0,
            wins_last_5=3,
            losses_last_5=1,
            drawns_last_5=1,
            goal_avg_last_5=1.8,
            avg_xG_last_5=1.5,
            avg_xGA_last_5=1.2,
            days_since_last_game=5,
            matches_14_days=3,
        )
        self.team_b = Team.objects.create(
            name="Team B",
            country="Country B",
            market_value=1.1,
            avg_age=26.0,
            xG=1.0,
            buildUpPlaySpeed=48,
            buildUpPlayPassing=58,
            chanceCreationPassing=67,
            chanceCreationCrossing=42,
            chanceCreationShooting=60,
            defencePressure=53,
            defenceAggression=62,
            defenceTeamWidth=47,
            team_strength=80.0,
            league_strength=75.0,
            glicko2_rating=1600.0,
            elo_rating=1650.0,
            wins_last_5=2,
            losses_last_5=2,
            drawns_last_5=1,
            goal_avg_last_5=1.2,
            avg_xG_last_5=1.1,
            avg_xGA_last_5=1.3,
            days_since_last_game=7,
            matches_14_days=2,
        )

    def test_serializer_fields(self):
        """
        Test that serializer returns expected fields and values.
        """
        dt = make_aware(datetime(2026, 6, 18, 0, 0, 0))
        match = Match.objects.create(home_team=self.team_a, away_team=self.team_b, date=dt)
        serializer = MatchSerializer(match)
        expected_fields = {'id', 'home_team', 'away_team', 'date'}
        self.assertEqual(set(serializer.data.keys()), expected_fields)
        self.assertEqual(isoparse(serializer.data['date']), dt)

    def test_missing_field(self):
        """
        Test serializer validation for missing required fields.
        """
        data = {
            "date": make_aware(datetime(2024, 6, 1, 0, 0)).isoformat(),
            "home_team": self.team_a.id
        }
        serializer = MatchSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("away_team", serializer.errors)

    def test_invalid_date(self):
        """
        Test serializer validation for invalid date format.
        """
        data = {
            "home_team": self.team_a.id,
            "away_team": self.team_b.id,
            "date": "invalid-date"
        }
        serializer = MatchSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("date", serializer.errors)

class MatchesViewTest(APITestCase):
    """
    Test case for the matches_list API view.
    """
    def setUp(self):
        self.team_a = Team.objects.create(
            name="Team A",
            country="Country A",
            market_value=1.0,
            avg_age=25.0,
            xG=1.2,
            buildUpPlaySpeed=50,
            buildUpPlayPassing=60,
            chanceCreationPassing=70,
            chanceCreationCrossing=40,
            chanceCreationShooting=65,
            defencePressure=55,
            defenceAggression=60,
            defenceTeamWidth=45,
            team_strength=90.0,
            league_strength=85.0,
            glicko2_rating=1700.0,
            elo_rating=1750.0,
            wins_last_5=3,
            losses_last_5=1,
            drawns_last_5=1,
            goal_avg_last_5=1.8,
            avg_xG_last_5=1.5,
            avg_xGA_last_5=1.2,
            days_since_last_game=5,
            matches_14_days=3,
        )
        self.team_b = Team.objects.create(
            name="Team B",
            country="Country B",
            market_value=1.1,
            avg_age=26.0,
            xG=1.0,
            buildUpPlaySpeed=48,
            buildUpPlayPassing=58,
            chanceCreationPassing=67,
            chanceCreationCrossing=42,
            chanceCreationShooting=60,
            defencePressure=53,
            defenceAggression=62,
            defenceTeamWidth=47,
            team_strength=80.0,
            league_strength=75.0,
            glicko2_rating=1600.0,
            elo_rating=1650.0,
            wins_last_5=2,
            losses_last_5=2,
            drawns_last_5=1,
            goal_avg_last_5=1.2,
            avg_xG_last_5=1.1,
            avg_xGA_last_5=1.3,
            days_since_last_game=7,
            matches_14_days=2,
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