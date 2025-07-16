from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tournament
from teams.models import Team
from .serializers import TournamentTeamSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter(
            'tournament_title', openapi.IN_QUERY, description="Tournament name", type=openapi.TYPE_STRING, required=True
        ),
        openapi.Parameter(
            'year', openapi.IN_QUERY, description="Tournament year", type=openapi.TYPE_STRING, required=True
        ),
    ],
    responses={
        200: TournamentTeamSerializer,
        400: openapi.Response('Bad request', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING)
            }
        )),
        404: openapi.Response('Not found', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING)
            }
        )),
    },
    operation_description="Get a list of tournament teams by name and year"
)
@api_view(['GET'])
def tournaments_list(request):
    """
    Returns a list of teams for a specific tournament and year.
    Query parameters: tournament_title (name), year (year).
    Returns 400 if parameters are missing, 404 if tournament not found.
    """
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