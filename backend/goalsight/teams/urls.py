from django.urls import path
from .views import teams_list

urlpatterns = [
    path('', teams_list, name='teams-list'),
]