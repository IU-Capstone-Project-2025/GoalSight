import csv
from django.core.management.base import BaseCommand
from teams.models import Team
import os

# BASE_URL = "https://github.com/Leo4815162342/football-logos/tree/main/logos"

# def sanitize_name(name):
#     return name.replace(" ", "-").replace(".", "").replace("/", "-")

class Command(BaseCommand):
    help = 'Import teams from a hardcoded CSV file'

    def handle(self, *args, **kwargs):
        """
        Imports team data from a CSV file and creates or updates Team objects in the database.
        The CSV file must contain all required fields for the Team model.
        """
        filepath = os.path.join(os.path.dirname(__file__), '../../data/initial_data.csv')
        filepath = os.path.abspath(filepath)

        with open(filepath, encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                team, created = Team.objects.update_or_create(
                    name=row['name'],
                    defaults={
                        'logo_url_32': row['logo_url_32'],
                        'logo_url_64': row['logo_url_64'],
                        'country': row['country'],
                        'market_value': float(row['market_value']) if row['market_value'] else 0,
                        'avg_age': float(row['avg_age']) if row['avg_age'] else 0,
                        'xG': float(row['xG']) if row['xG'] else 0,
                        'buildUpPlaySpeed': int(row['buildUpPlaySpeed']) if row['buildUpPlaySpeed'] else 0,
                        'buildUpPlayPassing': int(row['buildUpPlayPassing']) if row['buildUpPlayPassing'] else 0,
                        'chanceCreationPassing': int(row['chanceCreationPassing']) if row['chanceCreationPassing'] else 0,
                        'chanceCreationCrossing': int(row['chanceCreationCrossing']) if row['chanceCreationCrossing'] else 0,
                        'chanceCreationShooting': int(row['chanceCreationShooting']) if row['chanceCreationShooting'] else 0,
                        'defencePressure': int(row['defencePressure']) if row['defencePressure'] else 0,
                        'defenceAggression': int(row['defenceAggression']) if row['defenceAggression'] else 0,
                        'defenceTeamWidth': int(row['defenceTeamWidth']) if row['defenceTeamWidth'] else 0,
                        'team_strength': float(row['team_strength']) if row['team_strength'] else 0,
                        'league_strength': float(row['league_strength']) if row['league_strength'] else 0,
                        'glicko2_rating': float(row['glicko2_rating']) if row['glicko2_rating'] else 1500,
                        'elo_rating': float(row['elo_rating']) if row['elo_rating'] else 1500,
                        'wins_last_5': int(row['wins_last_5']) if row['wins_last_5'] else 0,
                        'losses_last_5': int(row['losses_last_5']) if row['losses_last_5'] else 0,
                        'drawns_last_5': int(row['drawns_last_5']) if row['drawns_last_5'] else 0,
                        'goal_avg_last_5': float(row['goal_avg_last_5']) if row['goal_avg_last_5'] else 0,
                        'avg_xG_last_5': float(row['avg_xG_last_5']) if row['avg_xG_last_5'] else 0,
                        'avg_xGA_last_5': float(row['avg_xGA_last_5']) if row['avg_xGA_last_5'] else 0,
                        'days_since_last_game': int(float(row['days_since_last_game'])) if row['days_since_last_game'] else 9999,
                        'matches_14_days': int(float(row['matches_14_days'])) if row['matches_14_days'] else 0,
                    }
                )
                action = 'Created' if created else 'Updated'
                self.stdout.write(f'{action} team: {team.name}')