import random
import os

from django.db import models


def get_file_name_ext(filename):
    base_name = os.path.basename(filename)
    name, ext = os.path.splitext(filename)
    return name, ext


def upload_image_path(instance, filename):
    print(instance)
    newfilename = random.randint(1, 1478222222)
    name, ext = get_file_name_ext(filename)
    final_name = f'{newfilename}{ext}'
    return f'products/{newfilename}/{final_name}'


class ProductManager(models.Manager):

    def get_by_id(self, id):
        qs = self.get_queryset().filter(id=id)
        if qs.count() == 1:
            return list(qs.values())
        return None


class Product (models.Model):
    PRODUCT_RATINGS = [
        (0, '0'),
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),

    ]

    CATEGORIES = [
        ('mis', 'Miscellaneous'),
        ('books', 'Books'),
        ('digital', 'Digital'),
        ('beauty', 'Beauty'),
        ('app', 'Appliances'),
        ('games', 'Video Games'),
        ('cons', 'Console'),
        ('software', 'Software'),
        ('pc-tech', 'Computers & Tech'),
        ('tvs', 'TVs'),
        ('gym', 'Gym'),
    ]

    name = models.CharField(max_length=250)
    price = models.DecimalField(decimal_places=2, max_digits=20, default=0.00)
    rating = models.SmallIntegerField(
        choices=PRODUCT_RATINGS, default=0,  null=True)
    category = models.CharField(max_length=13, choices=CATEGORIES, null=True)
    description = models.TextField(null=True)
    short_desc = models.TextField(null=True)
    featured = models.BooleanField(default=False)
    top_sell = models.BooleanField(default=False)
    in_stock = models.BooleanField(default=True)
    inventory_count = models.IntegerField(blank=True, null=True)
    image = models.CharField(max_length=250, null=True)

    objects = ProductManager()

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name
