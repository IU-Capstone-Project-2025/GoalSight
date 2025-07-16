from rest_framework import serializers

class MatchPredictionSerializer(serializers.Serializer):
    """
    Serializer for match prediction results. Provides win probabilities and team logo URLs.
    """
    home_win = serializers.FloatField(help_text="Probability of home team winning")
    away_win = serializers.FloatField(help_text="Probability of away team winning")
    logo_url_64_home = serializers.URLField()
    logo_url_64_away = serializers.URLField()