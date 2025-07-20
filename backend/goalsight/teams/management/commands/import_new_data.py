import requests
from django.core.management.base import BaseCommand
from datetime import datetime, timedelta, timezone
from django.utils import timezone as dj_timezone
from teams.models import Team

API_KEY = "75kwgw7361l0l1ir"
API_URL = "https://api.sstats.net/games/list"

class Command(BaseCommand):
    help = "Обновляет количество матчей за 14 дней и дни с последнего матча для каждой команды"

    def handle(self, *args, **kwargs):
        now = dj_timezone.now()
        from_date = (now - timedelta(days=14)).strftime("%Y-%m-%d")
        to_date = now.strftime("%Y-%m-%d")
        teams = Team.objects.all()
        headers = {"apikey": API_KEY}
        total = teams.count()

        for idx, team in enumerate(teams, start=1):
            team_id = team.api_id

            params_14d = {
                "team": team_id,
                "ended": "true",
                "from": from_date,
                "to": to_date,
                "limit": 14,
                "order": 1,
                "timezone": 3
            }

            try:
                response_14d = requests.get(API_URL, headers=headers, params=params_14d)
                response_14d.raise_for_status()
                data_14d = response_14d.json().get("data", [])
                matches_count = len(data_14d)
            except Exception as e:
                self.stderr.write(self.style.ERROR(f"Ошибка при получении матчей за 14 дней для {team.name}: {e}"))
                matches_count = 0

            params_last = {
                "team": team_id,
                "ended": "true",
                "limit": 1,
                "order": -1,
                "timezone": 3
            }

            days_since_last_game = -1
            try:
                response_last = requests.get(API_URL, headers=headers, params=params_last)
                response_last.raise_for_status()
                data_last = response_last.json().get("data", [])

                if data_last:
                    last_match_date_raw = data_last[0].get("dateUtc") or data_last[0].get("date")
                    if isinstance(last_match_date_raw, str):
                        last_match_date = datetime.fromisoformat(last_match_date_raw.replace("Z", "+00:00"))
                    elif isinstance(last_match_date_raw, int):
                        last_match_date = datetime.fromtimestamp(last_match_date_raw, tz=timezone.utc)
                    else:
                        raise ValueError("Неподдерживаемый формат даты")
                    days_since_last_game = (now - last_match_date).days
            except Exception as e:
                self.stderr.write(self.style.ERROR(f"Ошибка при получении последнего матча для {team.name}: {e}"))

            team.matches_14_days = matches_count
            team.days_since_last_game = days_since_last_game
            team.save(update_fields=["matches_14_days", "days_since_last_game"])

            progress = (idx / total) * 100
            self.stdout.write(
                f"[{idx}/{total}] {team.name}: {matches_count} матчей за 14 дней, "
                f"{days_since_last_game if days_since_last_game >= 0 else '—'} дней с последнего матча "
                f"({progress:.1f}%)"
            )