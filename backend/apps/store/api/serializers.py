from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, DjangoUnicodeDecodeError, smart_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from ..models import Product


User = get_user_model()


class ProductListSerializer(serializers.Serializer):
    name = serializers.CharField()
    price = serializers.DecimalField(decimal_places=2, max_digits=20,)
    rating = serializers.IntegerField()
    category = serializers.CharField()
    description = serializers.CharField()
    image = serializers.CharField()
    id = serializers.IntegerField()
    short_desc = serializers.CharField()
    featured = serializers.BooleanField()
    top_sell = serializers.BooleanField()
    in_stock = serializers.BooleanField()
    inventory_count = serializers.IntegerField(allow_null=True)

    class Meta:
        model = Product
        fields = '__all__'


class ProductDetailSerializer(serializers.Serializer):

    class Meta:
        model = Product
        fields = '__all__'
