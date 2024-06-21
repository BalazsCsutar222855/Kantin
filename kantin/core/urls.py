from django.urls import path
from .views import GetItemsView

urlpatterns = [
    path('albert/get-items/', GetItemsView.as_view(), name='get-items'),  # Define URL pattern for GetItemsView
]
