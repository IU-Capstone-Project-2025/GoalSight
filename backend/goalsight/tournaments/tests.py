from django.test import TestCase
from teams.models import Team
from tournaments.models import Tournament
from tournaments.serializers import TournamentTeamSerializer  
from rest_framework.test import APITestCase
from django.urls import reverse

class TournamentModelTest(TestCase):
    """
    Test case for the Tournament model.
    """
    def setUp(self):
        self.team1 = Team.objects.create(
            name="Team One",
            logo_url_32="http://example.com/logo_a.png",
            country="Country1",
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
        self.team2 = Team.objects.create(
            name="Team Two",
            logo_url_32="http://example.com/logo_b.png",
            country="Country2",
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

    def test_create_tournament_and_add_teams(self):
        """
        Test creating a Tournament and adding teams to it.
        """
        tournament = Tournament.objects.create(name="Champions League", year=2025)
        tournament.teams.add(self.team1, self.team2)
        tournament.save()

        self.assertEqual(tournament.name, "Champions League")
        self.assertEqual(tournament.year, 2025)
        self.assertEqual(tournament.teams.count(), 2)
        self.assertIn(self.team1, tournament.teams.all())
        self.assertIn(self.team2, tournament.teams.all())

    def test_str_method(self):
        """
        Test the string representation of the Tournament model.
        """
        tournament = Tournament.objects.create(name="Europa League", year=2024)
        self.assertEqual(str(tournament), "Europa League (2024)")

class TournamentTeamSerializerTest(TestCase):
    """
    Test case for the TournamentTeamSerializer.
    """
    def test_valid_data(self):
        """
        Test serializer with valid team data.
        """
        data = {
            'name': 'Team A',
            'country': 'Country A',
            'logo_url_32': 'http://example.com/logo.png'
        }
        serializer = TournamentTeamSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['name'], data['name'])
        self.assertEqual(serializer.validated_data['logo_url_32'], data['logo_url_32'])

    def test_missing_name(self):
        """
        Test serializer validation for missing team name.
        """
        data = {
            'country': 'Country A',
            'logo_url_32': 'http://example.com/logo.png'
        }
        serializer = TournamentTeamSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)

    def test_invalid_logo_url(self):
        """
        Test serializer validation for invalid logo URL.
        """
        data = {
            'name': 'Team A',
            'country': 'Country A',
            'logo_url_32': 'not-a-valid-url'
        }
        serializer = TournamentTeamSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('logo_url_32', serializer.errors)

class TournamentsListAPITest(APITestCase):
    """
    Test case for the tournaments_list API endpoint.
    """
    def setUp(self):
        self.team1 = Team.objects.create(
            name="Team One",
            logo_url_32="http://example.com/logo_a.png",
            country="Country1",
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
        self.team2 = Team.objects.create(
            name="Team Two",
            logo_url_32="http://example.com/logo_b.png",
            country="Country2",
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
        self.tournament = Tournament.objects.create(name="Champions League", year=2025)
        self.tournament.teams.add(self.team1, self.team2)

        self.url = reverse('tournaments-list') 

    def test_missing_parameters(self):
        """
        Test API response for missing required parameters.
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'tournament_title and year are required')

    def test_tournament_not_found(self):
        """
        Test API response when the tournament is not found.
        """
        response = self.client.get(self.url, {'tournament_title': 'Nonexistent', 'year': '2025'})
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Tournament not found')

    def test_successful_response(self):
        """
        Test API response for a successful request.
        """
        response = self.client.get(self.url, {'tournament_title': 'Champions League', 'year': '2025'})
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, list)
        self.assertEqual(len(response.data), 2)

        first_team = response.data[0]
        self.assertIn('name', first_team)
        self.assertIn('logo_url_32', first_team)
