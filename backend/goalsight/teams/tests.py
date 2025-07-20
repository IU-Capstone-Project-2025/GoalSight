from django.test import TestCase
from teams.models import Team
from teams.serializers import TeamStatsSerializer
from rest_framework.test import APITestCase
from django.urls import reverse

class TeamModelTest(TestCase):
    """
    Test case for the Team model.
    """
    def setUp(self):
        self.team_data = {
            "name": "Test Team",
            "logo_url_32": "http://example.com/logo32.png",
            "logo_url_64": "http://example.com/logo64.png",
            "country": "Testland",
            "market_value": 123.45,
            "avg_age": 27.5,
            "team_strength": 90.0,
            "league_strength": 85.0,
            "glicko2_rating": 1700.0,
            "elo_rating": 1750.0,
            "wins_last_5": 3,
            "draws_last_5": 1,
            "losses_last_5": 1,
            "goal_avg_last_5": 1.8,
            "avg_xG_last_5": 1.5,
            "avg_xGA_last_5": 1.2,
            "days_since_last_game": 5,
            "matches_14_days": 3,
        }

    def test_create_team(self):
        team = Team.objects.create(**self.team_data)
        for key, value in self.team_data.items():
            self.assertEqual(getattr(team, key), value)

    def test_str_method(self):
        team = Team.objects.create(**self.team_data)
        self.assertEqual(str(team), self.team_data["name"])

class TeamStatsSerializerTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name="Test Team",
            logo_url_32="http://example.com/logo32.png",
            logo_url_64="http://example.com/logo64.png",
            country="Testland",
            market_value=123.45,
            avg_age=27.5,
            team_strength=90.0,
            league_strength=85.0,
            glicko2_rating=1700.0,
            elo_rating=1750.0,
            wins_last_5=3,
            draws_last_5=1,
            losses_last_5=1,
            goal_avg_last_5=1.8,
            avg_xG_last_5=1.5,
            avg_xGA_last_5=1.2,
            days_since_last_game=5,
            matches_14_days=3,
        )

    def test_team_serializer(self):
        serializer = TeamStatsSerializer(self.team)
        data = serializer.data
        self.assertEqual(data['name'], self.team.name)
        self.assertEqual(data['logo_url_32'], self.team.logo_url_32)
        self.assertEqual(data['logo_url_64'], self.team.logo_url_64)
        self.assertEqual(data['country'], self.team.country)
        self.assertAlmostEqual(float(data['market_value']), self.team.market_value)
        self.assertAlmostEqual(float(data['avg_age']), self.team.avg_age)
        self.assertAlmostEqual(float(data['team_strength']), self.team.team_strength)
        self.assertAlmostEqual(float(data['league_strength']), self.team.league_strength)
        self.assertAlmostEqual(float(data['glicko2_rating']), self.team.glicko2_rating)
        self.assertAlmostEqual(float(data['elo_rating']), self.team.elo_rating)
        self.assertEqual(data['wins_last_5'], self.team.wins_last_5)
        self.assertEqual(data['draws_last_5'], self.team.draws_last_5)
        self.assertEqual(data['losses_last_5'], self.team.losses_last_5)
        self.assertAlmostEqual(float(data['goal_avg_last_5']), self.team.goal_avg_last_5)
        self.assertAlmostEqual(float(data['avg_xG_last_5']), self.team.avg_xG_last_5)
        self.assertAlmostEqual(float(data['avg_xGA_last_5']), self.team.avg_xGA_last_5)
        self.assertEqual(data['days_since_last_game'], self.team.days_since_last_game)
        self.assertEqual(data['matches_14_days'], self.team.matches_14_days)

class TeamsListAPITest(APITestCase):
    def setUp(self):
        self.team_a = Team.objects.create(
            name="Team A",
            logo_url_32="http://example.com/logo32.png",
            logo_url_64="http://example.com/logo64.png",
            country="Testland",
            market_value=123.45,
            avg_age=27.5,
            team_strength=90.0,
            league_strength=85.0,
            glicko2_rating=1700.0,
            elo_rating=1750.0,
            wins_last_5=3,
            draws_last_5=1,
            losses_last_5=1,
            goal_avg_last_5=1.8,
            avg_xG_last_5=1.5,
            avg_xGA_last_5=1.2,
            days_since_last_game=5,
            matches_14_days=3,
        )
        self.team_b = Team.objects.create(
            name="Team B",
            logo_url_32="http://example.com/logo32.png",
            logo_url_64="http://example.com/logo64.png",
            country="Testland",
            market_value=123.45,
            avg_age=27.5,
            team_strength=90.0,
            league_strength=85.0,
            glicko2_rating=1700.0,
            elo_rating=1750.0,
            wins_last_5=3,
            draws_last_5=1,
            losses_last_5=1,
            goal_avg_last_5=1.8,
            avg_xG_last_5=1.5,
            avg_xGA_last_5=1.2,
            days_since_last_game=5,
            matches_14_days=3,
        )
        self.url = reverse('teams-list') 

    def test_get_team_by_name(self):
        response = self.client.get(self.url, {'name': 'Team A'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['country'], self.team_a.country)
        self.assertEqual(float(response.data['market_value']), self.team_a.market_value)
        self.assertEqual(float(response.data['team_strength']), self.team_a.team_strength)

    def test_get_first_team_if_no_name(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['country'], self.team_a.country)

    def test_team_not_found(self):
        response = self.client.get(self.url, {'name': 'Nonexistent Team'})
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Team not found')

