from rest_framework import serializers

class MatchSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    date = serializers.DateField()
    home_team = serializers.CharField()
    away_team = serializers.CharField()