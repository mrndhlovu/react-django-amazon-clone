from django.urls import path, include

from .views import (
    CreateOrderAPIView,
    AddToCartAPIView,
    RemoveFromCartAPIView,
    ShoppingBasketOrdersListAPIView,
    ClearCartAPIView,
    UpdateCustomerAPIView,
    StripePaymentIntentAPIView,
    StripeCheckoutOrderAPIView,
)

app_name = 'orders'

urlpatterns = [
    path('add-to-cart', AddToCartAPIView.as_view(), name='add_to_cart'),
    path('payment-intent', StripePaymentIntentAPIView.as_view(),
         name='payment-intent'),
    path('checkout-order', StripeCheckoutOrderAPIView.as_view(),
         name='create-card'),
    path('clear-cart', ClearCartAPIView.as_view(), name='clear_cart'),
    path('update-customer', UpdateCustomerAPIView.as_view(), name='update_customer'),
    path('get-shopping-basket', ShoppingBasketOrdersListAPIView.as_view(),
         name='get_shopping_basket'),
    path('remove-from-cart', RemoveFromCartAPIView.as_view(),
         name='remove_from_cart'),
]
