from rest_framework import serializers
 
class TournamentTeamSerializer(serializers.Serializer):
    name = serializers.CharField()
    logo_url = serializers.URLField() 