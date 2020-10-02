from django.urls import path, include

from .views import (
    CreateOrderAPIView,
    AddToCartAPIView,
    RemoveFromCartAPIView,
    ShoppingBasketOrdersListAPIView,
    ClearCartAPIView,
)

app_name = 'orders'

urlpatterns = [
    path('add-to-cart', AddToCartAPIView.as_view(), name='add_to_cart'),
    path('clear-cart', ClearCartAPIView.as_view(), name='clear_cart'),
    path('get-shopping-basket', ShoppingBasketOrdersListAPIView.as_view(),
         name='get_shopping_basket'),
    path('remove-from-cart', RemoveFromCartAPIView.as_view(),
         name='remove_from_cart'),
]
