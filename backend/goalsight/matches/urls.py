from django.urls import path
from .views import matches_list
from .views import get_prediction

urlpatterns = [
    path('', matches_list, name='matches-list'),
    path('predict/', get_prediction, name='predict'),
]