from django.urls import path
from .views import matches_list

urlpatterns = [
    path('', matches_list, name='matches-list'),
]