import re
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models
import uuid


class Category(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.name


class Collection(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.name


def validate_hex(value):
    reg = re.compile('^#[a-f0-9]{6}$')
    if not reg.match(value) :
        raise ValidationError(u"%s hex n'a pas le bon format" % value)

class Color(models.Model):
    hex = models.CharField(max_length=7, validators =[validate_hex], null=False, blank=False, unique=True, default="#000000")
    name = models.CharField(max_length=50, null=False, blank=False, default="Noir")
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.href


class Mood(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    price = models.DecimalField(
        max_digits=4, decimal_places=2)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True)
    collection = models.ForeignKey(
        Collection, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    quantityInStock = models.IntegerField(default=1, null=False, blank=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.name


class Image(models.Model):
    product = models.ForeignKey(
        Product, related_name='images', on_delete=models.CASCADE, null=True)
    path = models.ImageField(null=True, blank=True, default='/default.webp')
    isMain = models.BooleanField(default=True, null=False, blank=False)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return str(self.id) + " " + str(self.path)

    def clean(self):
        if self.isMain:
            main = Image.objects.filter(isMain=True, product=self.product)
            if self.id:
                main = main.exclude(id=self.id)
            if main.exists():
                raise ValidationError("Only one main image per product... This product already has a main image.")


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=50, null=False, blank=False)
    shippingPrice = models.DecimalField(
        max_digits=4, decimal_places=2, null=False, blank=False)
    totalPrice = models.DecimalField(
        max_digits=4, decimal_places=2, null=False, blank=False)
    taxPrice = models.DecimalField(
        max_digits=4, decimal_places=2, null=False, blank=False)
    isPaid = models.BooleanField(default=False, null=False, blank=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False, null=False, blank=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self) -> str:
        return str(self.createdAt)


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=False, blank=False)
    qty = models.IntegerField(default=1, null=False, blank=False)
    price = models.DecimalField(
        max_digits=4, decimal_places=2, null=False, blank=False)
    image = models.CharField(max_length=200, null=False, blank=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    
    def __str__(self) -> str:
        return self.name


class Address(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=False, blank=False)
    # user = models.ForeignKey(User, on_delete=models.SET_NULL, null=False)
    address = models.CharField(max_length=200, null=False, blank=False)
    number = models.IntegerField(null=False, blank=False)
    box = models.IntegerField(null=True, blank=True)
    postalCode = models.CharField(max_length=20, null=False, blank=False)
    city = models.CharField(max_length=50, null=False, blank=False)
    country = models.CharField(max_length=50, null=False, blank=False)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.address

