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


class CustomerSerializer (serializers.Serializer):
    phone_number = serializers.CharField()

    class Meta:
        model = Customer
        fields = '__all__'

    def update(self, instance, validated_data):
        customer_data = validated_data
        for attr, value in customer_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
