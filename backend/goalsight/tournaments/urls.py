from django.urls import path
from .views import tournaments_list

urlpatterns = [
    path('', tournaments_list, name='tournaments-list'),
]