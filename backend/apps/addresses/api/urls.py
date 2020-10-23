from django.urls import path, include

from .views import (
    GetAddressAPIView,
    UpdateAddressAPIView,
    RemoveAddressAPIView,
)

app_name = 'addresses'

urlpatterns = [
    path('get-address', GetAddressAPIView.as_view(), name='get-address'),
    path('update-address', UpdateAddressAPIView.as_view(), name='update-address'),
    path('remove-address', RemoveAddressAPIView.as_view(), name='remove-address'),
]
