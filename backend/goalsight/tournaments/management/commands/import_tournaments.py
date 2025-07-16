import csv
from django.core.management.base import BaseCommand
from tournaments.models import Tournament
from teams.models import Team
import os

class Command(BaseCommand):
    help = "Import tournaments from hardcoded CSV file"

    def handle(self, *args, **kwargs):
        """
        Imports tournament data from a CSV file and creates or updates Tournament objects in the database.
        Each tournament is linked to teams by name.
        """
        filepath = os.path.join(os.path.dirname(__file__), '../../data/initial_data.csv')
        filepath = os.path.abspath(filepath)

        with open(filepath, encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                name = row['name']
                year = int(row['year'])
                teams_names = row['teams'].split(';')

                tournament, created = Tournament.objects.get_or_create(
                    name=name,
                    year=year
                )

                teams = Team.objects.filter(name__in=teams_names)
                tournament.teams.set(teams)
                tournament.save()

                self.stdout.write(
                    f"{'Created' if created else 'Updated'} tournament '{name}' ({year}) with {teams.count()} teams"
                )