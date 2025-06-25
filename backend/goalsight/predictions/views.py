from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .ml_service import prediction_service
from .serializers import MatchPredictionSerializer
from teams.models import Team
from matches.models import Match

@csrf_exempt
@require_http_methods(["POST"])
def predict_match(request):
    try:
        data = json.loads(request.body)
        home_team_name = data.get('home_team')
        away_team_name = data.get('away_team')

        if not home_team_name or not away_team_name:
            return JsonResponse({'error': 'Both home_team and away_team are required.'}, status=400)

        try:
            home_team = Team.objects.get(name=home_team_name)
            away_team = Team.objects.get(name=away_team_name)
        except Team.DoesNotExist:
            return JsonResponse({'error': 'One or both teams not found.'}, status=404)

        features = {
            'home_buildUpPlaySpeed': home_team.buildUpPlaySpeed,
            'home_buildUpPlayPassing': home_team.buildUpPlayPassing,
            'home_chanceCreationPassing': home_team.chanceCreationPassing,
            'home_chanceCreationCrossing': home_team.chanceCreationCrossing,
            'home_chanceCreationShooting': home_team.chanceCreationShooting,
            'home_defencePressure': home_team.defencePressure,
            'home_defenceAggression': home_team.defenceAggression,
            'home_defenceTeamWidth': home_team.defenceTeamWidth,
            'away_buildUpPlaySpeed': away_team.buildUpPlaySpeed,
            'away_buildUpPlayPassing': away_team.buildUpPlayPassing,
            'away_chanceCreationPassing': away_team.chanceCreationPassing,
            'away_chanceCreationCrossing': away_team.chanceCreationCrossing,
            'away_chanceCreationShooting': away_team.chanceCreationShooting,
            'away_defencePressure': away_team.defencePressure,
            'away_defenceAggression': away_team.defenceAggression,
            'away_defenceTeamWidth': away_team.defenceTeamWidth,
        }

        try:
            match = Match.objects.filter(home_team=home_team, away_team=away_team).order_by('date').first()
            if match:
                features['B365H'] = match.home
                features['B365D'] = match.draw
                features['B365A'] = match.away
        except Exception:
            features['B365H'] = 1
            features['B365D'] = 1
            features['B365A'] = 1

        for k, v in features.items():
            if v is None or (isinstance(v, float) and (v != v)):
                features[k] = 0.0
        result = prediction_service.predict(features)
        response_data = MatchPredictionSerializer(result).data
        return JsonResponse(response_data)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Bad JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def health_check(request):
    return JsonResponse({
        'status': 'ok',
        'model_loaded': prediction_service.model is not None
    })
