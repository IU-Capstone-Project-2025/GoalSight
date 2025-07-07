from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),

    path('matches/', include('matches.urls')),
    path('teams/', include('teams.urls')),
    path('tournaments/', include('tournaments.urls')),

    path('api/ml/', include('predictions.urls')),
]