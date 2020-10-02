from rest_framework import serializers

from ..models import Order, OrderItem, Customer
from ...store.api.serializers import ProductDetailSerializer


class CreateOrderSerializer (serializers.Serializer):
    class Meta:
        model = Order
        fields = '__all__'


class AddToCartSerializer (serializers.Serializer):

    class Meta:
        model = OrderItem
        fields = '__all__'


class OrdersSerializer (serializers.ModelSerializer):

    class Meta:
        model = Order
        exclude = ['customer', 'id', 'transaction_id', 'timestamp']


class OrderItemSerializer (serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        exclude = ['id', 'date_added', 'order']
