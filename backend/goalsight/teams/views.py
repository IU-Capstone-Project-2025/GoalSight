from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Team
from .serializers import TeamStatsSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter(
            'name',
            openapi.IN_QUERY,
            description="Team name to filter by",
            type=openapi.TYPE_STRING,
            example="Manchester United",
            required=False
        ),
    ],
    responses={
        200: TeamStatsSerializer,
        404: openapi.Response('Team not found', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, example='Team not found')
            }
        ))
    },
    operation_description="Get team statistics by name or first team if no name provided"
)
@api_view(['GET'])
def teams_list(request):
    """
    Returns statistics for a team by name, or the first team if no name is provided.
    Query parameter: name (team name)
    """
    name = request.query_params.get('name')
    if name:
        try:
            team = Team.objects.get(name=name)
        except Team.DoesNotExist:
            return Response({'error': 'Team not found'}, status=404)
    else:
        team = Team.objects.first()
    data = TeamStatsSerializer(team).data
    return Response(data)