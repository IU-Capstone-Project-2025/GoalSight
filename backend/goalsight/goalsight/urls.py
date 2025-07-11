from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="GoalSight API",
        default_version='v1',
        description="Football API with matches, teams and tournaments",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@goalsight.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('matches/', include('matches.urls')),
    path('teams/', include('teams.urls')),
    path('tournaments/', include('tournaments.urls')),

    path('api/ml/', include('predictions.urls')),
]