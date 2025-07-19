from django.db import models

class Team(models.Model):
    """
    Model representing a football team with statistics and attributes used for predictions.
    """
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    market_value = models.FloatField(default=0.0)
    avg_age = models.FloatField(default=0.0)
    api_id = models.IntegerField(null=True, blank=True)
    team_strength = models.FloatField(default=0.0)
    league_strength = models.FloatField(default=0.0)
    glicko2_rating = models.FloatField(default=1500.0)
    rd = models.FloatField(default=0.0)
    volatility = models.FloatField(default=0.0)
    elo_rating = models.FloatField(default=1500.0)
    wins_last_5 = models.IntegerField(default=0)
    draws_last_5 = models.IntegerField(default=0)
    losses_last_5 = models.IntegerField(default=0)
    goal_avg_last_5 = models.FloatField(default=0.0)
    avg_shots_on_target_last_5 = models.FloatField(default=0.0)
    avg_xG_last_5 = models.FloatField(default=0.0)
    avg_xGA_last_5 = models.FloatField(default=0.0)
    logo_url_32 = models.URLField(blank=True, null=True)
    logo_url_64 = models.URLField(blank=True, null=True)
    days_since_last_game = models.IntegerField(default = 0)
    matches_14_days = models.IntegerField(default = 0)

    def __str__(self):
        return self.name