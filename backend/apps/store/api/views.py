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
from django_filters import rest_framework as filters

from ..models import Product
from .serializers import ProductListSerializer, ProductDetailSerializer


class ProductFilter(filters.FilterSet):
    low_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    high_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['category', 'in_stock', 'low_price',
                  'high_price', 'description', 'rating', 'name', 'featured']


class ProductListAPIView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer
    permission_classes = (permissions.AllowAny,)
    pagination_class = PageNumberPagination
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter,)
    ordering_fields = ('-price', 'price', 'category', )
    search_fields = ('name', 'description', )
    filterset_class = ProductFilter

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        return Response(queryset.values())


class ProductDetailAPIView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)

    def get(self):
        request = self.request
        pk = self.kwargs.get('pk')
        instance = Product.objects.get_by_id(pk)
        serializer = self.serializer_class(data=instance)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            data = {'message': 'Product does not exist'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)


class ProductFeaturedAPIView(GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def get(self):
        query_set = Product.objects.featured()
        if query_set:
            return Response(query_set)
        else:
            data = {'message': 'Product does not exist'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)
