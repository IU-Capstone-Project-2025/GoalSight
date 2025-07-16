from rest_framework import serializers
 
class TournamentTeamSerializer(serializers.Serializer):
    """
    Serializer for tournament team information. Provides team name, country, and logo URL.
    """
    name = serializers.CharField()
    country = serializers.CharField()
    logo_url_32 = serializers.URLField() 