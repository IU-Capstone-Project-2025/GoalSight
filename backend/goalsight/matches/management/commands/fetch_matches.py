import requests
from django.core.management.base import BaseCommand
from matches.models import Match
from teams.models import Team
from datetime import datetime

API_KEY = "75kwgw7361l0l1ir"
API_URL = "https://api.sstats.net/games/list?leagueid=15&year=2025"  

class Command(BaseCommand):
    help = "Import matches by API"

    def handle(self, *args, **kwargs):
        headers = {"apikey": API_KEY}

        try:
            response = requests.get(API_URL, headers=headers)
            response.raise_for_status()
        except requests.RequestException as e:
            self.stderr.write(self.style.ERROR(f"Error: {e}"))
            return

        data = response.json().get("data", [])
        for item in data:
            home_name = item["homeTeam"]["name"]
            away_name = item["awayTeam"]["name"]
            date_str = item["date"]

            try:
                home_team = Team.objects.get(name=home_name)
                away_team = Team.objects.get(name=away_name)
            except Team.DoesNotExist as e:
                #self.stderr.write(f"Team not found: {e}")
                continue

            match_date = datetime.fromisoformat(date_str.replace("Z", "+00:00"))

            match, created = Match.objects.get_or_create(
                home_team=home_team,
                away_team=away_team,
                date=match_date,
            )

            self.stdout.write(f"{'Create' if created else 'Already exists'} match: {home_team} vs {away_team} ({match_date})")