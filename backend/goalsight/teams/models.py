from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=255)
    logo_url = models.URLField(blank=True, null=True)
    country = models.CharField(max_length=255)
    coach = models.CharField(max_length=255)
    market_value = models.FloatField()
    avg_age = models.FloatField()

    last_5_matches_wdl = models.JSONField()

    xG = models.FloatField()
    ball_possession = models.FloatField()
    shots_on_target = models.IntegerField()
    big_chances_created = models.IntegerField()

    #model
    buildUpPlaySpeed = models.IntegerField(null=True, blank=True)
    buildUpPlayPassing = models.IntegerField(null=True, blank=True)
    chanceCreationPassing = models.IntegerField(null=True, blank=True)
    chanceCreationCrossing = models.IntegerField(null=True, blank=True)
    chanceCreationShooting = models.IntegerField(null=True, blank=True)
    defencePressure = models.IntegerField(null=True, blank=True)
    defenceAggression = models.IntegerField(null=True, blank=True)
    defenceTeamWidth = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name
