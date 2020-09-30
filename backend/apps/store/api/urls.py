from django.urls import path, include

from .views import (
    ProductListAPIView,
    ProductDetailAPIView,
    ProductFeaturedAPIView,
)

app_name = 'store'

urlpatterns = [
    path('', ProductListAPIView.as_view(), name='list'),
    path('<id>/', ProductDetailAPIView.as_view(), name='product_detail'),
]
