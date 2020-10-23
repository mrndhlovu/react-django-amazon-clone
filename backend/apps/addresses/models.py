from django.db import models

from django.contrib.auth import get_user_model

User = get_user_model()


class Address (models.Model):
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100, null=True)
    county = models.CharField(max_length=100, null=True)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    postcode = models.CharField(max_length=20)
    is_shipping_address = models.BooleanField(default=False)

    def __str__(self):
        return self.owner.email
