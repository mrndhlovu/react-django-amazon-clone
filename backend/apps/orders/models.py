from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import F, Sum

from decimal import Decimal
import uuid
import math

from ..store.models import Product

User = get_user_model()

VALUE_ADDED_TAX = 19.0


class Customer (models.Model):
    phone_number = models.CharField(max_length=15)
    created = models.DateTimeField(auto_now_add=True)
    customer = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.customer.email


class Order (models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.SET_NULL, blank=True, null=True)
    order_date = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False, blank=False)
    timestamp = models.DateField(auto_now_add=True)
    item_count = models.IntegerField(default=0)
    sub_total = models.DecimalField(
        default=0.00, decimal_places=2, max_digits=20)
    total = models.DecimalField(default=0.00, decimal_places=2, max_digits=20)
    shipping = models.DecimalField(
        default=5.99, decimal_places=2, max_digits=20)
    taxes = 1 - 1 / (1 + VALUE_ADDED_TAX / 100)
    transaction_id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return str(self.customer)

    def save(self, *args, **kwargs):

        taxes = Decimal(self.sub_total) * Decimal(self.taxes)

        self.total = Decimal(taxes) + \
            (Decimal(self.sub_total) + Decimal(self.shipping))
        super(Order, self).save(*args, **kwargs)


class OrderItem (models.Model):
    date_added = models.DateTimeField(auto_now_add=True)
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=1, blank=True, null=True)
    value = models.DecimalField(default=0.00, decimal_places=2, max_digits=20)

    def __str__(self):
        return self.product.name

    def save(self, *args, **kwargs):
        self.value = self.product.price * self.quantity
        super(OrderItem, self).save(*args, **kwargs)
