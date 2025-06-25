from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Match
from teams.models import Team
from django.utils import timezone
from .serializers import MatchSerializer, MatchPredictionSerializer
from datetime import datetime

@api_view(['GET'])
def matches_list(request):
    date_str = request.query_params.get('date')
    if date_str:
        try:
            date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)
    else:
        date = timezone.now().date()
    matches = Match.objects.filter(date__gte=date).order_by('date')[:4]
    data = MatchSerializer(matches, many=True).data
    return Response(data)

# @api_view(['POST'])
# def get_prediction(request):
#     home_team = request.data.get("home_team")
#     away_team = request.data.get("away_team")

#     if not home_team or not away_team:
#         return Response({"error": "Both 'home_team' and 'away_team' are required."}, status=400)
#     result = {"prediction": home_team, "confidence": 0.88}
#     return Response(result)