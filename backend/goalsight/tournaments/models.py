from django.db import models
from teams.models import Team

class Tournament(models.Model):
    """
    Model representing a football tournament, including its name, year, and participating teams.
    """
    name = models.CharField(max_length=255)
    year = models.IntegerField()
    teams = models.ManyToManyField(Team, related_name='tournaments')

    def __str__(self):
        return f"{self.name} ({self.year})"
    
