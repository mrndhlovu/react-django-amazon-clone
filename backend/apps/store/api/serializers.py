from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, DjangoUnicodeDecodeError, smart_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from ..models import Product


User = get_user_model()


class ProductListSerializer(serializers.Serializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductDetailSerializer(serializers.Serializer):
    class Meta:
        model = Product
        fields = '__all__'
