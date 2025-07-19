import requests
from django.core.management.base import BaseCommand
from matches.models import Match
from teams.models import Team
from datetime import datetime

API_KEY = "75kwgw7361l0l1ir"
API_URL = "https://api.sstats.net/games/list?leagueid=15&year=2025&IncludeOdds=true"  

class Command(BaseCommand):
    help = "Import matches by API"

    def handle(self, *args, **kwargs):
        """
        Fetches match data from an external API and imports or updates Match objects in the database.
        Matches are linked to existing Team objects. Odds are also imported if available.
        """
        headers = {"apikey": API_KEY}
        params = {
            "leagueid": 15,
            "year": 2025,
            "IncludeOdds": "true",
            "limit": 150,
            "order": 1,
            "timezone": 3
        }

        try:
            response = requests.get(API_URL, headers=headers, params=params)
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
                continue

            match_date = datetime.fromisoformat(date_str.replace("Z", "+00:00"))

            odds_data = item.get("odds", [])
            home_odds = away_odds = draw_odds = None

            # Parse odds if available
            if odds_data and odds_data[0].get("odds"):
                for odd in odds_data[0]["odds"]:
                    if odd["name"] == "Home":
                        home_odds = odd["value"]
                    elif odd["name"] == "Away":
                        away_odds = odd["value"]

            match, created = Match.objects.get_or_create(
                home_team=home_team,
                away_team=away_team,
                date=match_date,
                defaults={
                    "home": home_odds,
                    "away": away_odds,
                }
            )

            if not created:
                match.home = home_odds
                match.away = away_odds
                match.save()

            self.stdout.write(f"{'Created' if created else 'Already exists'} match: {home_team} vs {away_team} ({match_date})")