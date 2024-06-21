from django.contrib import admin
from django.urls import path, include  # Import include to include URLs from other apps
from core.urls import urlpatterns as core_urls  # Import core app URL patterns

# Define urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(core_urls)),  # Include core app URL patterns under /albert/ namespace
]
