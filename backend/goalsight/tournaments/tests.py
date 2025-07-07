from django.test import TestCase
from teams.models import Team
from tournaments.models import Tournament
from tournaments.serializers import TournamentTeamSerializer  
from rest_framework.test import APITestCase
from django.urls import reverse

class TournamentModelTest(TestCase):
    def setUp(self):
        self.team1 = Team.objects.create(
            name="Team One",
            country="Country1",
            coach="Coach1",
            market_value=1.0,
            avg_age=25.0,
            last_5_matches_wdl=["W", "D", "L", "W", "W"],
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
            defenceTeamWidth=45,
        )
        self.team2 = Team.objects.create(
            name="Team Two",
            country="Country2",
            coach="Coach2",
            market_value=1.1,
            avg_age=26.0,
            last_5_matches_wdl=["L", "L", "W", "D", "W"],
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
            defenceTeamWidth=47,
        )

    def test_create_tournament_and_add_teams(self):
        tournament = Tournament.objects.create(name="Champions League", year=2025)
        tournament.teams.add(self.team1, self.team2)
        tournament.save()

        self.assertEqual(tournament.name, "Champions League")
        self.assertEqual(tournament.year, 2025)
        self.assertEqual(tournament.teams.count(), 2)
        self.assertIn(self.team1, tournament.teams.all())
        self.assertIn(self.team2, tournament.teams.all())

    def test_str_method(self):
        tournament = Tournament.objects.create(name="Europa League", year=2024)
        self.assertEqual(str(tournament), "Europa League (2024)")

class TournamentTeamSerializerTest(TestCase):
    def test_valid_data(self):
        data = {
            'name': 'Team A',
            'logo_url_32': 'http://example.com/logo.png'
        }
        serializer = TournamentTeamSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['name'], data['name'])
        self.assertEqual(serializer.validated_data['logo_url_32'], data['logo_url_32'])

    def test_missing_name(self):
        data = {
            'logo_url_32': 'http://example.com/logo.png'
        }
        serializer = TournamentTeamSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)

    def test_invalid_logo_url(self):
        data = {
            'name': 'Team A',
            'logo_url_32': 'not-a-valid-url'
        }
        serializer = TournamentTeamSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('logo_url_32', serializer.errors)

class TournamentsListAPITest(APITestCase):
    def setUp(self):
        self.team1 = Team.objects.create(
            name="Team One",
            country="Country1",
            coach="Coach1",
            market_value=1.0,
            avg_age=25.0,
            last_5_matches_wdl=["W", "D", "L", "W", "W"],
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
            defenceTeamWidth=45,
        )
        self.team2 = Team.objects.create(
            name="Team Two",
            country="Country2",
            coach="Coach2",
            market_value=1.1,
            avg_age=26.0,
            last_5_matches_wdl=["L", "L", "W", "D", "W"],
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
            defenceTeamWidth=47,
        )
        self.tournament = Tournament.objects.create(name="Champions League", year=2025)
        self.tournament.teams.add(self.team1, self.team2)

        self.url = reverse('tournaments-list') 

    def test_missing_parameters(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'tournament_title and year are required')

    def test_tournament_not_found(self):
        response = self.client.get(self.url, {'tournament_title': 'Nonexistent', 'year': '2025'})
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Tournament not found')

    def test_successful_response(self):
        response = self.client.get(self.url, {'tournament_title': 'Champions League', 'year': '2025'})
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, list)
        self.assertEqual(len(response.data), 2)

        first_team = response.data[0]
        self.assertIn('name', first_team)
        self.assertIn('logo_url_32', first_team)
