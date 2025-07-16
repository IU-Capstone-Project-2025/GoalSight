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
    Returns a list of upcoming matches, starting from the specified date (or current date if not provided).
    Query parameter: date (ISO format)
    """
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
