from django.db import models

class Team(models.Model):
    """
    Model representing a football team with statistics and attributes used for predictions.
    """
    name = models.CharField(max_length=255)
    logo_url_32 = models.URLField(blank=True, null=True)
    logo_url_64 = models.URLField(blank=True, null=True)
    country = models.CharField(max_length=255)
    market_value = models.FloatField()
    avg_age = models.FloatField()

    xG = models.FloatField()

    # Model features for ML predictions
    buildUpPlaySpeed = models.IntegerField(null=True, blank=True)
    buildUpPlayPassing = models.IntegerField(null=True, blank=True)
    chanceCreationPassing = models.IntegerField(null=True, blank=True)
    chanceCreationCrossing = models.IntegerField(null=True, blank=True)
    chanceCreationShooting = models.IntegerField(null=True, blank=True)
    defencePressure = models.IntegerField(null=True, blank=True)
    defenceAggression = models.IntegerField(null=True, blank=True)
    defenceTeamWidth = models.IntegerField(null=True, blank=True)

    # === Custom team features for predictions ===
    team_strength = models.FloatField(default=0.0)
    league_strength = models.FloatField(default=0.0)
    glicko2_rating = models.FloatField(default=1500.0)  
    elo_rating = models.FloatField(default=1500.0)     

    wins_last_5 = models.IntegerField(default=0)
    losses_last_5 = models.IntegerField(default=0)
    drawns_last_5 = models.IntegerField(default=0)
    goal_avg_last_5 = models.FloatField(default=0.0)
    avg_xG_last_5 = models.FloatField(default=0.0)
    avg_xGA_last_5 = models.FloatField(default=0.0)

    days_since_last_game = models.IntegerField(default=9999)  
    matches_14_days = models.IntegerField(default=0)

    def __str__(self):
        return self.name