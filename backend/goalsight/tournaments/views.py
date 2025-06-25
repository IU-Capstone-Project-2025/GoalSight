from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tournament
from teams.models import Team
from .serializers import TournamentTeamSerializer

@api_view(['GET'])
def tournaments_list(request):
    tournament_title = request.query_params.get('tournament_title')
    year = request.query_params.get('year')
    if not tournament_title or not year:
        return Response({'error': 'tournament_title and year are required'}, status=400)
    try:
        tournament = Tournament.objects.get(name=tournament_title, year=year)
    except Tournament.DoesNotExist:
        return Response({'error': 'Tournament not found'}, status=404)
    teams = tournament.teams.all()
    data = TournamentTeamSerializer(teams, many=True).data
    return Response(data)