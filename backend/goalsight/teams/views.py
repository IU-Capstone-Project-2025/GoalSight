from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Team
from .serializers import TeamStatsSerializer

@api_view(['GET'])
def teams_list(request):
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