from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_match, name='predict_match'),
    path('health/', views.health_check, name='ml_health'),
]