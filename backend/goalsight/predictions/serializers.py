from rest_framework import serializers
 
class ProbabilitiesSerializer(serializers.Serializer):
    home_win = serializers.FloatField()
    away_win = serializers.FloatField()
    draw = serializers.FloatField()

class MatchPredictionSerializer(serializers.Serializer):
    prediction = serializers.CharField()
    confidence = serializers.FloatField()
    probabilities = ProbabilitiesSerializer()
    model_type = serializers.CharField()
    model_accuracy = serializers.FloatField() 