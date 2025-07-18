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
            "logo_url_64": "http://example.com/logo.png",
            "country": "Testland",
            "market_value": 123.45,
            "avg_age": 27.5,
            "xG": 1.23,
            "buildUpPlaySpeed": 50,
            "buildUpPlayPassing": 60,
            "chanceCreationPassing": 70,
            "chanceCreationCrossing": 40,
            "chanceCreationShooting": 65,
            "defencePressure": 55,
            "defenceAggression": 60,
            "defenceTeamWidth": 45,
            "team_strength": 90.0,
            "league_strength": 85.0,
            "glicko2_rating": 1700.0,
            "elo_rating": 1750.0,
            "wins_last_5": 3,
            "losses_last_5": 1,
            "drawns_last_5": 1,
            "goal_avg_last_5": 1.8,
            "avg_xG_last_5": 1.5,
            "avg_xGA_last_5": 1.2,
            "days_since_last_game": 5,
            "matches_14_days": 3,
        }

    def test_create_team(self):
        team = Team.objects.create(**self.team_data)
        self.assertEqual(team.name, self.team_data["name"])
        self.assertEqual(team.logo_url_64, self.team_data["logo_url_64"])
        self.assertEqual(team.country, self.team_data["country"])
        self.assertAlmostEqual(team.market_value, self.team_data["market_value"])
        self.assertAlmostEqual(team.avg_age, self.team_data["avg_age"])
        self.assertAlmostEqual(team.xG, self.team_data["xG"])
        self.assertEqual(team.buildUpPlaySpeed, self.team_data["buildUpPlaySpeed"])
        self.assertEqual(team.buildUpPlayPassing, self.team_data["buildUpPlayPassing"])
        self.assertEqual(team.chanceCreationPassing, self.team_data["chanceCreationPassing"])
        self.assertEqual(team.chanceCreationCrossing, self.team_data["chanceCreationCrossing"])
        self.assertEqual(team.chanceCreationShooting, self.team_data["chanceCreationShooting"])
        self.assertEqual(team.defencePressure, self.team_data["defencePressure"])
        self.assertEqual(team.defenceAggression, self.team_data["defenceAggression"])
        self.assertEqual(team.defenceTeamWidth, self.team_data["defenceTeamWidth"])
        self.assertEqual(team.team_strength, self.team_data["team_strength"])
        self.assertEqual(team.league_strength, self.team_data["league_strength"])
        self.assertEqual(team.glicko2_rating, self.team_data["glicko2_rating"])
        self.assertEqual(team.elo_rating, self.team_data["elo_rating"])
        self.assertEqual(team.wins_last_5, self.team_data["wins_last_5"])
        self.assertEqual(team.losses_last_5, self.team_data["losses_last_5"])
        self.assertEqual(team.drawns_last_5, self.team_data["drawns_last_5"])
        self.assertEqual(team.goal_avg_last_5, self.team_data["goal_avg_last_5"])
        self.assertEqual(team.avg_xG_last_5, self.team_data["avg_xG_last_5"])
        self.assertEqual(team.avg_xGA_last_5, self.team_data["avg_xGA_last_5"])
        self.assertEqual(team.days_since_last_game, self.team_data["days_since_last_game"])
        self.assertEqual(team.matches_14_days, self.team_data["matches_14_days"])

    def test_str_method(self):
        team = Team.objects.create(**self.team_data)
        self.assertEqual(str(team), self.team_data["name"])

class TeamStatsSerializerTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name="Test Team",
            logo_url_64="http://example.com/logo.png",
            country="Testland",
            market_value=123.45,
            avg_age=27.5,
            xG=1.23,
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

    def test_serialization(self):
        serializer = TeamStatsSerializer(self.team)
        data = dict(serializer.data)
        expected_fields = [
            'country', 'market_value', 'avg_age',
            'team_strength', 'league_strength', 'glicko2_rating', 'elo_rating',
            'wins_last_5', 'losses_last_5', 'drawns_last_5', 'goal_avg_last_5',
            'avg_xG_last_5', 'avg_xGA_last_5', 'days_since_last_game', 'matches_14_days'
        ]
        self.assertEqual(set(data.keys()), set(expected_fields))
        self.assertEqual(data['country'], self.team.country)
        self.assertEqual(float(data['market_value']), self.team.market_value)
        self.assertEqual(float(data['avg_age']), self.team.avg_age)
        self.assertEqual(float(data['team_strength']), self.team.team_strength)
        self.assertEqual(float(data['league_strength']), self.team.league_strength)
        self.assertEqual(float(data['glicko2_rating']), self.team.glicko2_rating)
        self.assertEqual(float(data['elo_rating']), self.team.elo_rating)
        self.assertEqual(data['wins_last_5'], self.team.wins_last_5)
        self.assertEqual(data['losses_last_5'], self.team.losses_last_5)
        self.assertEqual(data['drawns_last_5'], self.team.drawns_last_5)
        self.assertEqual(float(data['goal_avg_last_5']), self.team.goal_avg_last_5)
        self.assertEqual(float(data['avg_xG_last_5']), self.team.avg_xG_last_5)
        self.assertEqual(float(data['avg_xGA_last_5']), self.team.avg_xGA_last_5)
        self.assertEqual(data['days_since_last_game'], self.team.days_since_last_game)
        self.assertEqual(data['matches_14_days'], self.team.matches_14_days)

class TeamsListAPITest(APITestCase):
    def setUp(self):
        self.team_a = Team.objects.create(
            name="Team A",
            logo_url_64="http://example.com/logo_a.png",
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
            logo_url_64="http://example.com/logo_b.png",
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

