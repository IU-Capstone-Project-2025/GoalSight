from rest_framework import serializers

class MatchSerializer(serializers.Serializer):
    id = serializers.IntegerField(help_text="Match ID")
    date = serializers.DateTimeField(help_text="Match date and time")
    home_team = serializers.CharField(help_text="Home team name")
    away_team = serializers.CharField(help_text="Away team name")