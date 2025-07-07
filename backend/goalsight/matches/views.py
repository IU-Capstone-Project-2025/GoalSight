from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Match
from teams.models import Team
from django.utils import timezone
from .serializers import MatchSerializer
from datetime import datetime

@api_view(['GET'])
def matches_list(request):
    #date_str = request.query_params.get('date', "2025-06-09T18:00:00Z")
    date_str = "2025-06-30T10:00:00Z"
    if date_str:
        try:
            date = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)
    else:
        date = timezone.now()
    matches = Match.objects.filter(date__gte=date).order_by('date')[:5]
    data = MatchSerializer(matches, many=True).data
    return Response(data)
