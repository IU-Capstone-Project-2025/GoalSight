import random
from datetime import datetime, timedelta
from django.utils import timezone
from django.core.management.base import BaseCommand
from teams.models import Team
from matches.models import Match
from tournaments.models import Tournament

class Command(BaseCommand):
    help = "Заполняет базу тестовыми командами, матчами и турниром FIFA Club World Cup 2025"

    def handle(self, *args, **options):
        Match.objects.all().delete()
        Tournament.objects.all().delete()
        Team.objects.all().delete()

        countries = ["Brazil", "Germany", "Spain", "France", "England", "Italy", "Netherlands"]
        logos_32 = [
            "https://example.com/logo1_32.png",
            "https://example.com/logo2_32.png",
            "https://example.com/logo3_32.png",
        ]
        logos_64 = [
            "https://example.com/logo1_64.png",
            "https://example.com/logo2_64.png",
            "https://example.com/logo3_64.png",
        ]

        teams = []
        for i in range(10):
            team = Team.objects.create(
                name=f"Test Team {i+1}",
                country=random.choice(countries),
                market_value=round(random.uniform(50, 300), 1),
                avg_age=round(random.uniform(20, 35), 1),
                api_id=1000 + i,
                team_strength=round(random.uniform(50, 100), 1),
                league_strength=round(random.uniform(60, 90), 1),
                glicko2_rating=round(random.uniform(1000, 2000), 1),
                rd=round(random.uniform(30, 60), 1),
                volatility=round(random.uniform(0.1, 0.9), 2),
                elo_rating=round(random.uniform(1000, 2000), 1),
                wins_last_5=random.randint(0, 5),
                draws_last_5=random.randint(0, 5),
                losses_last_5=random.randint(0, 5),
                goal_avg_last_5=round(random.uniform(0, 4), 2),
                avg_shots_on_target_last_5=round(random.uniform(0, 10), 2),
                avg_xG_last_5=round(random.uniform(0, 3), 2),
                avg_xGA_last_5=round(random.uniform(0, 3), 2),
                logo_url_32=random.choice(logos_32),
                logo_url_64=random.choice(logos_64),
                days_since_last_game=random.randint(0, 30),
                matches_14_days=random.randint(0, 14),
            )
            self.stdout.write(f"Создана команда: {team.name}")
            teams.append(team)

        num_matches = 10
        for _ in range(num_matches):
            home, away = random.sample(teams, 2)
            naive_date = datetime.now() - timedelta(days=random.randint(0, 365))
            aware_date = timezone.make_aware(naive_date)

            home_score = round(random.uniform(0, 5), 1)
            away_score = round(random.uniform(0, 5), 1)

            match = Match.objects.create(
                home_team=home,
                away_team=away,
                date=aware_date,
                home=home_score,
                away=away_score,
            )
            self.stdout.write(f"Создан матч: {home.name} vs {away.name} ({home_score} - {away_score})")

        tournament = Tournament.objects.create(
            name="FIFA Club World Cup",
            year=2025,
        )
        tournament.teams.set(teams)
        tournament.save()
        self.stdout.write(f"Создан турнир: {tournament.name} с командами: {[t.name for t in teams]}")

        self.stdout.write(self.style.SUCCESS("✅ Тестовые команды, матчи и турнир успешно созданы"))