from rest_framework import serializers
from .models import Team

class TeamStatsSerializer(serializers.ModelSerializer):
    """
    Serializer for team statistics. Provides key attributes for API responses.
    """
    class Meta:
        model = Team
        fields = [
            'country', 'market_value', 'avg_age',
            'team_strength', 'league_strength', 'glicko2_rating', 'elo_rating',
            'wins_last_5', 'losses_last_5', 'drawns_last_5', 'goal_avg_last_5',
            'avg_xG_last_5', 'avg_xGA_last_5', 'days_since_last_game', 'matches_14_days'
        ]
        extra_kwargs = {
            'country': {'help_text': 'Team country'},
            'market_value': {'help_text': 'Team market value in millions'},
            'avg_age': {'help_text': 'Average team age'},
            'team_strength': {'help_text': 'Team strength'},
            'league_strength': {'help_text': 'League strength'},
            'glicko2_rating': {'help_text': 'Glicko-2 rating'},
            'elo_rating': {'help_text': 'Elo rating'},
            'wins_last_5': {'help_text': 'Wins in last 5 matches'},
            'losses_last_5': {'help_text': 'Losses in last 5 matches'},
            'drawns_last_5': {'help_text': 'Draws in last 5 matches'},
            'goal_avg_last_5': {'help_text': 'Average goals scored in last 5 matches'},
            'avg_xG_last_5': {'help_text': 'Average expected goals in last 5 matches'},
            'avg_xGA_last_5': {'help_text': 'Average expected goals against in last 5 matches'},
            'days_since_last_game': {'help_text': 'Days since last game'},
            'matches_14_days': {'help_text': 'Matches played in last 14 days'},
        } 