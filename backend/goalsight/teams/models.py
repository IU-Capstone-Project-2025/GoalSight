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

    def __str__(self):
        return self.name
