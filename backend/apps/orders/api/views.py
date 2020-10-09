from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.generics import GenericAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ...store.models import Product
from ..models import Order, OrderItem, Customer
from .serializers import (
    AddToCartSerializer,
    CreateOrderSerializer,
    OrdersSerializer,
    OrderItemSerializer,
    CustomerSerializer
)

import json
import decimal
import stripe


stripe.api_key = settings.STRIPE_API_KEY


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


class StripePaymentIntentAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:

            customer = Customer.objects.get(customer=request.user)
            print("customer", customer)
            order = Order.objects.get(customer=customer, complete=False)

            intent = stripe.PaymentIntent.create(
                amount=int(order.total*100),
                currency='eur'
            )
            customer_cards = stripe.Customer.list_sources(
                customer.stripe_customer_id,
                object="card",
                limit=3,
            )

            data = {
                'clientSecret': intent['client_secret'], 'cards': customer_cards['data']}
            return Response(data)
        except Exception as e:
            data = {'message': str(e)}
            return Response(data,  status=status.HTTP_404_NOT_FOUND)


class StripeCheckoutOrderAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            stripe_complete_id = request.data['stripe_complete_id']
            customer = Customer.objects.get(customer=request.user)

            order = Order.objects.get(customer=customer, complete=False)
            order.complete = True
            order.stripe_complete_id = stripe_complete_id
            order.save()

            stripe.Customer.create_source(
                customer.stripe_customer_id,
                source=request.data['token']
            )
            customer_cards = stripe.Customer.list_sources(
                customer.stripe_customer_id,
                object="card",
            )

            return Response(customer_cards['data'])
        except Exception as e:
            data = {'message': str(e)}
            return Response(data,  status=status.HTTP_404_NOT_FOUND)


class CreateOrderAPIView(RetrieveAPIView):
    serializer_class = CreateOrderSerializer
    permission_classes = (IsAuthenticated,)
    model = Order

    def get(self, request):
        stripe_customer = stripe.Customer.retrieve(email=request.user.email)
        customer, created = Customer.objects.get_or_create(
            customer=request.user, stripe_customer_id=stripe_customer['id'])
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
            customer = Customer.objects.get(customer=request.user)
            order = Order.objects.get(customer=customer, complete=False)
            order_items = OrderItem.objects.filter(order__id=order.id)

            serializedOrderItems = OrderItemSerializer(
                order_items, many=True)
            order_items = json.loads(json.dumps(serializedOrderItems.data))
        except:
            data = {'items': []}
            return Response(data, status=status.HTTP_200_OK)
        updated_order = get_cart_data(order, order_items)
        serializer = self.serializer_class(updated_order)
        data = serializer.data
        data['items'] = order_items
        return Response(data)


class CompleteOrdersListAPIView(RetrieveAPIView):
    serializer_class = OrdersSerializer
    permission_classes = (IsAuthenticated,)
    model = Order

    def get(self, request):
        try:
            data = []
            customer = Customer.objects.get(customer=request.user, )
            orders = Order.objects.filter(customer=customer, complete=True)
            for order in orders:
                order_items = OrderItem.objects.filter(order=order)
                serializedOrderItems = OrderItemSerializer(
                    order_items, many=True)
                order_items = json.loads(json.dumps(serializedOrderItems.data))
                updated_order = get_cart_data(order, order_items)
                serializer = self.serializer_class(updated_order)
                updated_serializer = serializer.data
                updated_serializer['items'] = order_items
                data.append(updated_serializer)

        except:
            return Response(data, status=status.HTTP_200_OK)
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

            customer = Customer.objects.get(customer=request.user,)

            order, created = Order.objects.get_or_create(
                customer=customer, complete=False)
            orderItem, created = OrderItem.objects.get_or_create(
                order=order, order__id=order.id, product=product)
            orderItem.quantity = quantity
            orderItem.save()

            order_items = OrderItem.objects.filter(order=order)
            serializedOrderItems = OrderItemSerializer(order_items, many=True)
            order_items = json.loads(json.dumps(serializedOrderItems.data))

            updated_order = get_cart_data(order, order_items)
            serializer = OrdersSerializer(order)
            data = serializer.data
            data['items'] = order_items

        except Customer.DoesNotExist:
            data = {'message': 'Customer does not exist'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)

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
            order = Order.objects.get(customer=customer, complete=False)
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
            order = Order.objects.get(customer=customer, complete=False)
            order_items = OrderItem.objects.filter(order=order)

            for item in order_items:
                item.delete()

        except:
            data = {'message': 'Failed to clear shopping basket'}
            return Response(data, status=status.HTTP_404_NOT_FOUND)

        else:
            data = {'message': 'Shopping basket cleared.'}
            return Response(status=status.HTTP_200_OK)


class UpdateCustomerAPIView(UpdateAPIView):
    model = Customer
    serializer_class = CustomerSerializer
    permission_classes = (IsAuthenticated,)

    def put(self, request):

        try:
            customer = Customer.objects.get(customer=request.user)
            serializer = self.serializer_class(customer, data=request.data)
        except Customer.DoesNotExist:
            data = {'message': 'Customer not found.'}
            return Response(status=status.HTTP_404_NOT_FOUND, data=data)

        if serializer.is_valid():
            serializer.save()
            data = {'success': True, 'customer': serializer.data}
            return Response(data=data)
        else:
            context = serializer.errors
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
