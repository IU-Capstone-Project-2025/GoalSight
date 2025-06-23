from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .ml_service import prediction_service

@csrf_exempt
@require_http_methods(["POST"])
def predict_match(request):
    try:
        data = json.loads(request.body)
        result = prediction_service.predict(data)
        return JsonResponse(result)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Bad JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def health_check(request):
    return JsonResponse({
        'status': 'ok',
        'model_loaded': prediction_service.model is not None
    })
