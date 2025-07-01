from django.test import TestCase
from teams.models import Team
from teams.serializers import TeamStatsSerializer
from rest_framework.test import APITestCase
from django.urls import reverse

class TeamModelTest(TestCase):
    def setUp(self):
        self.team_data = {
            "name": "Test Team",
            "logo_url": "http://example.com/logo.png",
            "country": "Testland",
            "coach": "John Doe",
            "market_value": 123.45,
            "avg_age": 27.5,
            "last_5_matches_wdl": ["W", "D", "L", "W", "W"],
            "xG": 1.23,
            "ball_possession": 55.5,
            "shots_on_target": 7,
            "big_chances_created": 3,
            "buildUpPlaySpeed": 50,
            "buildUpPlayPassing": 60,
            "chanceCreationPassing": 70,
            "chanceCreationCrossing": 40,
            "chanceCreationShooting": 65,
            "defencePressure": 55,
            "defenceAggression": 60,
            "defenceTeamWidth": 45,
        }

    def test_create_team(self):
        team = Team.objects.create(**self.team_data)
        self.assertEqual(team.name, self.team_data["name"])
        self.assertEqual(team.logo_url, self.team_data["logo_url"])
        self.assertEqual(team.country, self.team_data["country"])
        self.assertEqual(team.coach, self.team_data["coach"])
        self.assertAlmostEqual(team.market_value, self.team_data["market_value"])
        self.assertAlmostEqual(team.avg_age, self.team_data["avg_age"])
        self.assertEqual(team.last_5_matches_wdl, self.team_data["last_5_matches_wdl"])
        self.assertAlmostEqual(team.xG, self.team_data["xG"])
        self.assertAlmostEqual(team.ball_possession, self.team_data["ball_possession"])
        self.assertEqual(team.shots_on_target, self.team_data["shots_on_target"])
        self.assertEqual(team.big_chances_created, self.team_data["big_chances_created"])
        self.assertEqual(team.buildUpPlaySpeed, self.team_data["buildUpPlaySpeed"])
        self.assertEqual(team.buildUpPlayPassing, self.team_data["buildUpPlayPassing"])
        self.assertEqual(team.chanceCreationPassing, self.team_data["chanceCreationPassing"])
        self.assertEqual(team.chanceCreationCrossing, self.team_data["chanceCreationCrossing"])
        self.assertEqual(team.chanceCreationShooting, self.team_data["chanceCreationShooting"])
        self.assertEqual(team.defencePressure, self.team_data["defencePressure"])
        self.assertEqual(team.defenceAggression, self.team_data["defenceAggression"])
        self.assertEqual(team.defenceTeamWidth, self.team_data["defenceTeamWidth"])

    def test_str_method(self):
        team = Team.objects.create(**self.team_data)
        self.assertEqual(str(team), self.team_data["name"])

class TeamStatsSerializerTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name="Test Team",
            logo_url="http://example.com/logo.png",
            country="Testland",
            coach="John Doe",
            market_value=123.45,
            avg_age=27.5,
            last_5_matches_wdl=["W", "D", "L", "W", "W"],
            xG=1.23,
            ball_possession=55.5,
            shots_on_target=7,
            big_chances_created=3,
            buildUpPlaySpeed=50,
            buildUpPlayPassing=60,
            chanceCreationPassing=70,
            chanceCreationCrossing=40,
            chanceCreationShooting=65,
            defencePressure=55,
            defenceAggression=60,
            defenceTeamWidth=45,
        )

    def test_serialization(self):
        serializer = TeamStatsSerializer(self.team)
        data = serializer.data

        expected_fields = [
            'logo_url', 'country', 'coach', 'market_value', 'avg_age',
            'xG', 'ball_possession', 'shots_on_target', 'big_chances_created',
            'last_5_matches_wdl'
        ]

        self.assertEqual(set(data.keys()), set(expected_fields))

        self.assertEqual(data['logo_url'], self.team.logo_url)
        self.assertEqual(data['country'], self.team.country)
        self.assertEqual(data['coach'], self.team.coach)
        self.assertEqual(data['market_value'], self.team.market_value)
        self.assertEqual(data['last_5_matches_wdl'], self.team.last_5_matches_wdl)

class TeamsListAPITest(APITestCase):
    def setUp(self):
        self.team_a = Team.objects.create(
            name="Team A",
            logo_url="http://example.com/logo_a.png",
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
            logo_url="http://example.com/logo_b.png",
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
        self.url = reverse('teams-list') 

    def test_get_team_by_name(self):
        response = self.client.get(self.url, {'name': 'Team A'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['country'], self.team_a.country)
        self.assertEqual(response.data['coach'], self.team_a.coach)

    def test_get_first_team_if_no_name(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['country'], self.team_a.country)

    def test_team_not_found(self):
        response = self.client.get(self.url, {'name': 'Nonexistent Team'})
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Team not found')

