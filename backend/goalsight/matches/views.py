from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

@api_view(['GET'])
def matches_list(request):
    return Response("Matches list")

@api_view(['POST'])
def get_prediction(request):
    home_team = request.data.get("home_team")
    away_team = request.data.get("away_team")

    if not home_team or not away_team:
        return Response({"error": "Both 'home_team' and 'away_team' are required."}, status=400)
    ml_response = requests.post("http://model:8001/predict", json={
        "home_team": home_team,
        "away_team": away_team
    })
    return Response(ml_response.json())