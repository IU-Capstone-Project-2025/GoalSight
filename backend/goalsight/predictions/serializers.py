from rest_framework import serializers

class MatchPredictionSerializer(serializers.Serializer):
    home_win = serializers.FloatField(help_text="Probability of home team winning")
    away_win = serializers.FloatField(help_text="Probability of away team winning")
    logo_url_64_home = serializers.URLField() 
    logo_url_64_away = serializers.URLField() 