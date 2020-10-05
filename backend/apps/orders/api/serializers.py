from rest_framework import serializers

from ..models import Order, OrderItem, Customer
from ...store.api.serializers import ProductDetailSerializer


class CreateOrderSerializer (serializers.Serializer):
    class Meta:
        model = Order
        fields = '__all__'


class OrdersSerializer (serializers.ModelSerializer):
    complete = serializers.BooleanField()
    timestamp = serializers.DateField()
    item_count = serializers.IntegerField()
    shipping = serializers.DecimalField(decimal_places=2, max_digits=20)
    sub_total = serializers.DecimalField(decimal_places=2, max_digits=20)
    total = serializers.DecimalField(decimal_places=2, max_digits=20)

    class Meta:
        model = Order
        fields = ['complete', 'item_count', 'sub_total',
                  'timestamp', 'total', 'shipping']


class OrderItemSerializer (serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    product_image = serializers.CharField(source='product.image')
    inventory_count = serializers.CharField(source='product.inventory_count')
    rating = serializers.CharField(source='product.rating')

    class Meta:
        model = OrderItem
        exclude = ['id', 'date_added', 'order']


class AddToCartSerializer (serializers.Serializer):

    class Meta:
        model = OrderItem
        fields = '__all__'


class CustomerSerializer (serializers.Serializer):
    phone_number = serializers.CharField()
    stripe_customer_id = serializers.CharField()

    class Meta:
        model = Customer
        fields = '__all__'

    def update(self, instance, validated_data):
        customer_data = validated_data
        for attr, value in customer_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
