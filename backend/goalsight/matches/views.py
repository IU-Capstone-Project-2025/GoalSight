from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Match
from teams.models import Team
from django.utils import timezone
from .serializers import MatchSerializer
from datetime import datetime
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter(
            'date',
            openapi.IN_QUERY,
            description="Date filter for matches (ISO format: YYYY-MM-DDTHH:MM:SSZ)",
            type=openapi.TYPE_STRING,
            format=openapi.FORMAT_DATETIME,
            example="2025-06-30T10:00:00Z",
            required=False
        ),
    ],
    responses={
        200: MatchSerializer(many=True),
        400: openapi.Response('Invalid date format', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, example='Invalid date format. Use YYYY-MM-DD.')
            }
        ))
    },
    operation_description="Get upcoming matches with optional date filter"
)
@api_view(['GET'])
def matches_list(request):
    """
    Returns up to 5 upcoming matches from the specified date.
    If there are fewer than 5, returns previous matches instead.
    Query parameter: date (ISO format)
    """
    date_str = request.query_params.get('date', None)

    if date_str:
        try:
            date = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        except ValueError:
            return Response({'error': 'Invalid date format. Use ISO format.'}, status=400)
    else:
        date = timezone.now()

    upcoming_matches = Match.objects.filter(date__gte=date).order_by('date')[:5]

    if upcoming_matches.count() < 5:
        needed = 5 - upcoming_matches.count()
        previous_matches = Match.objects.filter(date__lt=date).order_by('-date')[:needed]

        combined_matches = list(upcoming_matches) + list(reversed(previous_matches))
    else:
        combined_matches = upcoming_matches

    data = MatchSerializer(combined_matches, many=True).data
    return Response(data)
