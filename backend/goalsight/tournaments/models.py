from django.db import models
from teams.models import Team

class Tournament(models.Model):
    name = models.CharField(max_length=255)
    year = models.IntegerField()
    teams = models.ManyToManyField(Team, related_name='tournaments')
    
