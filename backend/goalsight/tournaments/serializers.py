from rest_framework import serializers
 
class TournamentTeamSerializer(serializers.Serializer):
    name = serializers.CharField()
    country = serializers.CharField()
    logo_url_32 = serializers.URLField() 