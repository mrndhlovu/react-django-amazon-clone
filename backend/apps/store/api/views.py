from django.shortcuts import get_object_or_404
from django.views.generic import ListView
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status, permissions

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import UpdateAPIView, GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend, NumberFilter, FilterSet

from ..models import Product
from .serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
)


class ProductFilter(FilterSet):
    low_price = NumberFilter(field_name="price", lookup_expr='gte')
    high_price = NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['category', 'in_stock', 'low_price',
                  'high_price', 'description', 'rating', 'name', 'featured']


class ProductListAPIView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer
    permission_classes = (permissions.AllowAny,)
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,
                       SearchFilter, OrderingFilter,)
    ordering_fields = ('-price', 'price', 'category', )
    search_fields = ('name', 'description', )
    filterset_class = ProductFilter
    ordering = ['id']


class ProductDetailAPIView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProductDetailSerializer

    def get(self, request, id=None, format=None):
        request = self.request
        id = self.kwargs.get('id')
        product = Product.objects.get_by_id(id)
        if product:
            return Response(product)
        else:
            data = {'message': 'Product does not exist'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)
