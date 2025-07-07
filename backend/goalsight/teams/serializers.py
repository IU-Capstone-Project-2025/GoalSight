from rest_framework import serializers
from .models import Team

class TeamStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = [
            'logo_url_64', 'country', 'coach', 'market_value', 'avg_age',
            'xG', 'ball_possession', 'shots_on_target', 'big_chances_created',
            'last_5_matches_wdl'
        ]
        extra_kwargs = {
            'logo_url_64': {'help_text': 'Team logo URL'},
            'country': {'help_text': 'Team country'},
            'coach': {'help_text': 'Team coach name'},
            'market_value': {'help_text': 'Team market value in millions'},
            'avg_age': {'help_text': 'Average team age'},
            'xG': {'help_text': 'Expected goals'},
            'ball_possession': {'help_text': 'Average ball possession percentage'},
            'shots_on_target': {'help_text': 'Average shots on target per game'},
            'big_chances_created': {'help_text': 'Big chances created per game'},
            'last_5_matches_wdl': {'help_text': 'Last 5 matches results (W/D/L)'},
        } 