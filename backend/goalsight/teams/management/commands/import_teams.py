import csv
from django.core.management.base import BaseCommand
from teams.models import Team
import os

BASE_URL = "https://github.com/Leo4815162342/football-logos/tree/main/logos"

def sanitize_name(name):
    return name.replace(" ", "-").replace(".", "").replace("/", "-")

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
                        'country': row['country'],
                        'coach': row['coach'],
                        'market_value': float(row['market_value']) if row['market_value'] else 0,
                        'avg_age': float(row['avg_age']) if row['avg_age'] else 0,
                        'last_5_matches_wdl': row['last_5_matches_wdl'],
                        'xG': float(row['xG']) if row['xG'] else 0,
                        'ball_possession': float(row['ball_possession']) if row['ball_possession'] else 0,
                        'shots_on_target': int(row['shots_on_target']) if row['shots_on_target'] else 0,
                        'big_chances_created': int(row['big_chances_created']) if row['big_chances_created'] else 0,
                        'buildUpPlaySpeed': int(row['buildUpPlaySpeed']) if row['buildUpPlaySpeed'] else 0,
                        'buildUpPlayPassing': int(row['buildUpPlayPassing']) if row['buildUpPlayPassing'] else 0,
                        'chanceCreationPassing': int(row['chanceCreationPassing']) if row['chanceCreationPassing'] else 0,
                        'chanceCreationCrossing': int(row['chanceCreationCrossing']) if row['chanceCreationCrossing'] else 0,
                        'chanceCreationShooting': int(row['chanceCreationShooting']) if row['chanceCreationShooting'] else 0,
                        'defencePressure': int(row['defencePressure']) if row['defencePressure'] else 0,
                        'defenceAggression': int(row['defenceAggression']) if row['defenceAggression'] else 0,
                        'defenceTeamWidth': int(row['defenceTeamWidth']) if row['defenceTeamWidth'] else 0,
                    }
                )
                filename = sanitize_name(row['name'].lower()) + ".png"
                logo_url_32 = BASE_URL + "/" + row['country'].lower() + "/" +"32x32/" +filename
                logo_url_64 = BASE_URL + "/" + row['country'].lower() + "/" +"64x64/" +filename
                team.logo_url_32 = logo_url_32
                team.logo_url_64 = logo_url_64
                team.save()
                action = 'Created' if created else 'Updated'
                self.stdout.write(f'{action} team: {team.name}')