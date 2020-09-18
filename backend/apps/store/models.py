from django.db import models

from django.contrib.auth import get_user_model

User = get_user_model()


class Customer (models.Model):
    address = models.CharField(max_length=250)
    bio = models.TextField(max_length=500, blank=True)
    city = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    customer = models.OneToOneField(User, on_delete=models.CASCADE)
    postal_code = models.CharField(max_length=20)

    def __str__(self):
        return self.customer.email


class Product (models.Model):
    name = models.CharField(max_length=250)
    price = models.FloatField()
    # image

    def __str__(self):
        return self.name


class Order (models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.SET_NULL, blank=True, null=True)
    order_date = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False, blank=False)
    transaction_id = models.BooleanField(max_length=200, null=True)

    def __str__(self):
        return str(self.id)


class OrderItem (models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, blank=True, null=True)
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0, blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.name


class ShippingAddress (models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.SET_NULL, blank=True, null=True)
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0, blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=100)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address
