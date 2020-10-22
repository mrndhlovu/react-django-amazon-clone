from rest_framework import serializers

from ..models import Address


class AddressSerializer (serializers.Serializer):
    address = serializers.CharField(min_length=2)
    city = serializers.CharField(min_length=2)
    country = serializers.CharField(min_length=2)
    county = serializers.CharField(min_length=2)
    postcode = serializers.CharField(min_length=2)
    is_shipping_address = serializers.BooleanField(allow_null=True)

    class Meta:
        model = Address
        fields = '__all__'

    def update(self, instance, validated_data):
        customer_data = validated_data
        for attr, value in customer_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
