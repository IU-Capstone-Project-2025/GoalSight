import csv
from django.core.management.base import BaseCommand
from teams.models import Team
import os

# BASE_URL = "https://github.com/Leo4815162342/football-logos/tree/main/logos"

# def sanitize_name(name):
#     return name.replace(" ", "-").replace(".", "").replace("/", "-")

class Command(BaseCommand):
    help = 'Import teams from a new-format CSV file'

    def handle(self, *args, **kwargs):
        """
        Imports team data from a new-format CSV file and creates or updates Team objects in the database.
        The CSV file must contain all required fields for the Team model.
        """
        filepath = os.path.join(os.path.dirname(__file__), '../../data/initial_data.csv')
        filepath = os.path.abspath(filepath)

        with open(filepath, encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                team, created = Team.objects.update_or_create(
                    name=row['team'],
                    defaults={
                        'logo_url_32': row.get('logo_url_32', ''),
                        'logo_url_64': row.get('logo_url_64', ''),
                        'country': row.get('country', ''),
                        'market_value': float(row['market_value']) if row.get('market_value') else 0,
                        'avg_age': float(row['avg_age']) if row.get('avg_age') else 0,
                        'team_strength': float(row['team_strength']) if row.get('team_strength') else 0,
                        'league_strength': float(row['league_strength']) if row.get('league_strength') else 0,
                        'glicko2_rating': float(row['glicko2_rating']) if row.get('glicko2_rating') else 1500,
                        'rd': float(row['rd']) if row.get('rd') else 0,
                        'volatility': float(row['volatility']) if row.get('volatility') else 0,
                        'elo_rating': float(row['elo_rating']) if row.get('elo_rating') else 1500,
                        'wins_last_5': int(row['wins_last_5']) if row.get('wins_last_5') else 0,
                        'losses_last_5': int(row['losses_last_5']) if row.get('losses_last_5') else 0,
                        'draws_last_5': int(row['draws_last_5']) if row.get('draws_last_5') else 0,
                        'goal_avg_last_5': float(row['goal_avg_last_5']) if row.get('goal_avg_last_5') else 0,
                        'avg_shots_on_target_last_5': float(row['avg_shots_on_target_last_5']) if row.get('avg_shots_on_target_last_5') else 0,
                        'avg_xG_last_5': float(row['avg_xG_last_5']) if row.get('avg_xG_last_5') else 0,
                        'avg_xGA_last_5': float(row['avg_xGA_last_5']) if row.get('avg_xGA_last_5') else 0,
                        'api_id': int(row['api_id']) if row.get('api_id') else None,
                        'days_since_last_game': 0,
                        'matches_14_days': 0,
                    }
                )
                action = 'Created' if created else 'Updated'
                self.stdout.write(f'{action} team: {team.name}')