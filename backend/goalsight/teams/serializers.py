from rest_framework import serializers
from .models import Team

class TeamStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = [
            'logo_url', 'country', 'coach', 'market_value', 'avg_age',
            'xG', 'ball_possession', 'shots_on_target', 'big_chances_created',
            'last_5_matches_wdl'
        ] 