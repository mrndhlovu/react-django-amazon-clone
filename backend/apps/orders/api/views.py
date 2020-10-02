
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ...store.models import Product
from ..models import Order, OrderItem, Customer
from .serializers import AddToCartSerializer, CreateOrderSerializer, OrdersSerializer, OrderItemSerializer

import json
import decimal


def get_cart_data(order, order_items):

    count = 0
    sub_total = 0.00
    if order_items:
        for item in order_items:
            count += item['quantity']
            sub_total += float(item['value'])

    order.item_count = count
    order.sub_total = decimal.Decimal(sub_total)
    order.save()
    return order


class CreateOrderAPIView(RetrieveAPIView):
    serializer_class = CreateOrderSerializer
    permission_classes = (IsAuthenticated,)
    model = Order

    def get(self, request):
        customer, created = Customer.objects.get_or_create(
            customer=request.user)
        order = Order.objects.get_or_create(customer=customer)
        serializer = self.serializer_class(order)

        if serializer:
            return Response(serializer.data)
        else:
            data = {'message': 'Order does not exist'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)


class ShoppingBasketOrdersListAPIView(RetrieveAPIView):
    serializer_class = OrdersSerializer
    permission_classes = (IsAuthenticated,)
    model = Order

    def get(self, request):
        try:
            customer = Customer.objects.get(customer=request.user, )
            order = Order.objects.get(customer=customer, complete=False)
            order_items = OrderItem.objects.filter(
                order=order, order__id=order.id)
            serializedOrderItems = OrderItemSerializer(order_items, many=True)
            order_items = json.loads(json.dumps(serializedOrderItems.data))
        except:
            data = {'message': 'Shopping basket does not exist'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)

        updated_order = get_cart_data(order, order_items)
        serializer = self.serializer_class(updated_order)
        data = serializer.data
        data['items'] = order_items
        return Response(data)


class AddToCartAPIView(GenericAPIView):
    serializer_class = AddToCartSerializer
    permission_classes = (IsAuthenticated,)
    model = OrderItem

    def post(self, request):
        try:
            productId = request.data['productId']
            quantity = request.data['quantity']
            product = Product.objects.get(id=productId)

            customer, created = Customer.objects.get_or_create(
                customer=request.user)
            order, created = Order.objects.get_or_create(
                customer=customer, complete=False)
            orderItem, created = OrderItem.objects.get_or_create(
                order=order, order__id=order.id, product=product)
            orderItem.quantity = quantity
            orderItem.save()

            order_items = OrderItem.objects.filter(
                order=order, order__id=order.id)
            serializedOrderItems = OrderItemSerializer(order_items, many=True)
            order_items = json.loads(json.dumps(serializedOrderItems.data))

            updated_order = get_cart_data(order, order_items)
            serializer = OrdersSerializer(order)
            data = serializer.data
            data['items'] = order_items
        except:
            data = {'message': 'Order does not exist'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response(data=data, status=status.HTTP_200_OK)


class RemoveFromCartAPIView(GenericAPIView):
    serializer_class = AddToCartSerializer
    permission_classes = (IsAuthenticated,)
    model = OrderItem

    def post(self, request):
        try:
            productId = request.data['productId']
            product = Product.objects.get(id=productId)
            customer = Customer.objects.get(customer=request.user)
            order = Order.objects.get(customer=customer)
            orderItem = OrderItem.objects.get(
                order=order, order__id=order.id, product=product)
            orderItem.delete()

            order_items = OrderItem.objects.filter(
                order=order, order__id=order.id)
            serializedOrderItems = OrderItemSerializer(order_items, many=True)
            order_items = json.loads(json.dumps(serializedOrderItems.data))
            updated_order = get_cart_data(order, order_items)

            serializer = OrdersSerializer(order)
            data = serializer.data
            data['items'] = order_items

        except:
            data = {'message': 'Item not in shoping basket'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response(data=data, status=status.HTTP_200_OK)


class ClearCartAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    model = OrderItem

    def get(self, request):
        try:
            customer = Customer.objects.get(customer=request.user)
            order = Order.objects.get(customer=customer)
            order_items = OrderItem.objects.filter(order=order)

            for item in order_items:
                item.delete()

        except:
            data = {'message': 'Failed to clear shopping basket'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)

        else:
            data = {'message': 'Shopping basket cleared.'}
            return Response(status=status.HTTP_200_OK)
