import csv
from django.core.management.base import BaseCommand
from teams.models import Team
import os

class Command(BaseCommand):
    help = 'Import teams from a hardcoded CSV file'

    def handle(self, *args, **kwargs):
        filepath = os.path.join(os.path.dirname(__file__), '../../data/initial_data.csv')
        filepath = os.path.abspath(filepath)

        with open(filepath, encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                team, created = Team.objects.update_or_create(
                    name=row['name'],
                    defaults={
                        'logo_url': row['logo_url'],
                        'country': row['country'],
                        'coach': row['coach'],
                        'market_value': float(row['market_value']) if row['market_value'] else 0,
                        'avg_age': float(row['avg_age']) if row['avg_age'] else 0,
                        'last_5_matches_wdl': row['last_5_matches_wdl'],
                        'xG': float(row['xG']) if row['xG'] else 0,
                        'ball_possession': float(row['ball_possession']) if row['ball_possession'] else 0,
                        'shots_on_target': int(row['shots_on_target']) if row['shots_on_target'] else 0,
                        'big_chances_created': int(row['big_chances_created']) if row['big_chances_created'] else 0,
                    }
                )
                action = 'Created' if created else 'Updated'
                self.stdout.write(f'{action} team: {team.name}')