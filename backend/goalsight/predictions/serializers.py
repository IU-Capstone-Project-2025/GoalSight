from rest_framework import serializers
 
class ProbabilitiesSerializer(serializers.Serializer):
    home_win = serializers.FloatField(help_text="Probability of home team winning")
    away_win = serializers.FloatField(help_text="Probability of away team winning")
    draw = serializers.FloatField(help_text="Probability of a draw")

class MatchPredictionSerializer(serializers.Serializer):
    prediction = serializers.CharField(help_text="Predicted match outcome")
    confidence = serializers.FloatField(help_text="Model confidence in prediction")
    probabilities = ProbabilitiesSerializer()
    model_type = serializers.CharField(help_text="Type of ML model used")
    model_accuracy = serializers.FloatField(help_text="Model accuracy score") 