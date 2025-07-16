from rest_framework import serializers

class MatchSerializer(serializers.Serializer):
    """
    Serializer for Match model. Provides match ID, date, and team names for API responses.
    """
    id = serializers.IntegerField(help_text="Match ID")
    date = serializers.DateTimeField(help_text="Match date and time")
    home_team = serializers.CharField(help_text="Home team name")
    away_team = serializers.CharField(help_text="Away team name")