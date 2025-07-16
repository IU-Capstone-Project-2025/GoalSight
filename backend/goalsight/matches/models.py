from django.db import models
from teams.models import Team

class Match(models.Model):
    """
    Model representing a football match between two teams.
    Stores information about the teams, date, and outcome odds.
    """
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    date = models.DateTimeField()
    home = models.FloatField(null=True, blank=True)
    away = models.FloatField(null=True, blank=True)
    draw = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} ({self.date})"

