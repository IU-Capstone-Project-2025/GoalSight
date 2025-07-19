from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests
from .ml_service import prediction_service
from .serializers import MatchPredictionSerializer
from teams.models import Team
from matches.models import Match
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timezone
import logging
logger = logging.getLogger(__name__)
API_KEY = "75kwgw7361l0l1ir"

@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['home_team', 'away_team'],
        properties={
            'home_team': openapi.Schema(
                type=openapi.TYPE_STRING,
                description="Name of the home team",
                example="Manchester United"
            ),
            'away_team': openapi.Schema(
                type=openapi.TYPE_STRING,
                description="Name of the away team", 
                example="Liverpool"
            ),
        }
    ),
    responses={
        200: MatchPredictionSerializer,
        400: openapi.Response('Bad request', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, example='Both home_team and away_team are required.')
            }
        )),
        404: openapi.Response('Team not found', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, example='One or both teams not found.')
            }
        )),
        500: openapi.Response('Server error', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, example='Internal server error')
            }
        ))
    },
    operation_description="Predict match outcome between two teams using ML model"
)
@api_view(['POST'])
def predict_match(request):
    """
    Predict the outcome of a match between two teams using the ML model.
    Expects JSON with 'home_team' and 'away_team'.
    Returns prediction probabilities and team logos.
    """
    try:
        data = json.loads(request.body)
        home_team_name = data.get('home_team')
        away_team_name = data.get('away_team')

        if not home_team_name or not away_team_name:
            return Response({'error': 'Both home_team and away_team are required.'}, status=400)

        try:
            home_team = Team.objects.get(name=home_team_name)
            away_team = Team.objects.get(name=away_team_name)
        except Team.DoesNotExist:
            return Response({'error': 'One or both teams not found.'}, status=404)

        features = {
            'away_avg_age': away_team.avg_age,
            'away_goal_avg_last_5': away_team.goal_avg_last_5,
            'away_avg_shots_on_target_last_5': away_team.avg_shots_on_target_last_5,
            'away_avg_xG_last_5': away_team.avg_xG_last_5,
            'away_avg_xGA_last_5': away_team.avg_xGA_last_5,
            'away_days_since_last_game': away_team.days_since_last_game,
            'away_elo_rating': away_team.elo_rating,
            'away_glicko2_rating': away_team.glicko2_rating,
            'away_market_value': away_team.market_value,
            'away_matches_14_days': away_team.matches_14_days,
            'away_rd': away_team.rd,
            'away_volatility': away_team.volatility,
            'league_strength_away': away_team.league_strength,
            'team_strength_away': away_team.team_strength,
            'away_wins_last_5': away_team.wins_last_5,
            'away_losses_last_5': away_team.losses_last_5,
            'away_draws_last_5': away_team.draws_last_5,

            'home_avg_age': home_team.avg_age,
            'home_goal_avg_last_5': home_team.goal_avg_last_5,
            'home_avg_shots_on_target_last_5': home_team.avg_shots_on_target_last_5,
            'home_avg_xG_last_5': home_team.avg_xG_last_5,
            'home_avg_xGA_last_5': home_team.avg_xGA_last_5,
            'home_days_since_last_game': home_team.days_since_last_game,
            'home_elo_rating': home_team.elo_rating,
            'home_glicko2_rating': home_team.glicko2_rating,
            'home_market_value': home_team.market_value,
            'home_matches_14_days': home_team.matches_14_days,
            'home_rd': home_team.rd,
            'home_volatility': home_team.volatility,
            'league_strength_home': home_team.league_strength,
            'team_strength_home': home_team.team_strength,
            'home_wins_last_5': home_team.wins_last_5,
            'home_losses_last_5': home_team.losses_last_5,
            'home_draws_last_5': home_team.draws_last_5,
        }

        features['home_att_vs_diff'] = home_team.avg_xG_last_5 + away_team.avg_xGA_last_5
        features['away_att_vs_diff'] = away_team.avg_xG_last_5 + home_team.avg_xGA_last_5

        try:
            match = Match.objects.filter(home_team=home_team, away_team=away_team).order_by('date').first()
            if match:
                features['date'] = match.date
                features['home_win_odd'] = match.home
                features['away_win_odd'] = match.away
            else:
                headers = {"apikey": API_KEY}
                url = f"https://api.sstats.net/games/list?bothTeams={home_team.api_id},{away_team.api_id}&ended=true&order=-1&limit=1"
                response = requests.get(url, headers=headers)
                data = response.json().get('data', [])
                if not data:
                    features['home_win_odd'] = 1
                    features['away_win_odd'] = 1
                else:
                    match_data = data[0]  # берем первый матч
                    odds = match_data.get('odds', [])

                    features['date'] = datetime.now(timezone.utc)
                    home_odd = odds[0]['value'] if len(odds) > 0 and 'value' in odds[0] else 1
                    away_odd = odds[1]['value'] if len(odds) > 1 and 'value' in odds[1] else 1
                    
                    features['home_win_odd'] = home_odd
                    features['away_win_odd'] = away_odd
        except Exception:
            headers = {"apikey": API_KEY}
            url = f"https://api.sstats.net/games/list?bothTeams={home_team.api_id},{away_team.api_id}&ended=true&order=-1&limit=1"
            response = requests.get(url, headers=headers)
            data = response.json().get('data', [])
            if not data:
                    features['home_win_odd'] = 1
                    features['away_win_odd'] = 1
            else:
                match_data = data[0]  # берем первый матч
                odds = match_data.get('odds', [])

                features['date'] = datetime.now(timezone.utc)
                home_odd = odds[0]['value'] if len(odds) > 0 and 'value' in odds[0] else 1
                away_odd = odds[1]['value'] if len(odds) > 1 and 'value' in odds[1] else 1
                
                features['home_win_odd'] = home_odd
                features['away_win_odd'] = away_odd
        logger.info(f"Prediction result: {features}")
        result = prediction_service.predict(features)
        result['logo_url_64_home'] = home_team.logo_url_64
        result['logo_url_64_away'] = away_team.logo_url_64
        logger.info(f"Prediction result: {result}")
        response_data = MatchPredictionSerializer(result).data
        return Response(response_data)
    except json.JSONDecodeError:
        return Response({'error': 'Bad JSON'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@swagger_auto_schema(
    method='get',
    responses={
        200: openapi.Response('Health check response', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'status': openapi.Schema(type=openapi.TYPE_STRING, example='ok'),
                'model_loaded': openapi.Schema(type=openapi.TYPE_BOOLEAN, example=True)
            }
        ))
    },
    operation_description="Check ML service health status"
)
@api_view(['GET'])
def health_check(request):
    """
    Health check endpoint for the ML prediction service.
    Returns status and whether the model is loaded.
    """
    return Response({
        'status': 'ok',
        'model_loaded': prediction_service.model is not None
    })
