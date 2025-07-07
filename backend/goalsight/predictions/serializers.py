from rest_framework import serializers
 
class ProbabilitiesSerializer(serializers.Serializer):
    home_win = serializers.FloatField(help_text="Probability of home team winning")
    away_win = serializers.FloatField(help_text="Probability of away team winning")
    draw = serializers.FloatField(help_text="Probability of a draw")

class MatchPredictionSerializer(serializers.Serializer):
    home_win = serializers.FloatField(help_text="Probability of home team winning")
    away_win = serializers.FloatField(help_text="Probability of away team winning")