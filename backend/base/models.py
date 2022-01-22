from django.db import models
import uuid
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.name


class Collection(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    price = models.DecimalField(
        max_digits=4, decimal_places=2, null=False, blank=False)
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
        Product, related_name='images', on_delete=models.SET_NULL, null=True)
    path = models.ImageField(null=True, blank=True)
    isMain = models.BooleanField(default=True, null=False, blank=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self) -> str:
        return str(self.path)


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


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=False, blank=False)
    # user = models.ForeignKey(User, on_delete=models.SET_NULL, null=False)
    address = models.CharField(max_length=200, null=False, blank=False)
    number = models.IntegerField(null=False, blank=False)
    box = models.IntegerField(null=True, blank=True)
    postalCode = models.CharField(max_length=20, null=False, blank=False)
    city = models.CharField(max_length=50, null=False, blank=False)
    country = models.CharField(max_length=50, null=False, blank=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.address


class BillingAddress(models.Model):
    sameAsShipping = models.BooleanField(default=True, null=False, blank=False)
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=False, blank=False)
    # user = models.ForeignKey(User, on_delete=models.SET_NULL, null=False)
    address = models.CharField(max_length=200, null=False, blank=False)
    number = models.IntegerField(null=False, blank=False)
    box = models.IntegerField(null=True, blank=True)
    postalCode = models.CharField(max_length=20, null=False, blank=False)
    city = models.CharField(max_length=50, null=False, blank=False)
    country = models.CharField(max_length=50, null=False, blank=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.address
