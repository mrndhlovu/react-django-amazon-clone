from django.urls import path, include

from .views import (
    ProductListAPIView,
    ProductDetailAPIView,
    ProductFeaturedAPIView,
)

app_name = 'store'

urlpatterns = [
    path('all/', ProductListAPIView.as_view(), name='all-products'),
    path('<pk>/', ProductDetailAPIView.as_view(), name='product_detail'),
    path('featured/', ProductFeaturedAPIView.as_view(), name='featured'),
]
