from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['path', 'isMain']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['__all__']


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['__all__']


class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    category = serializers.StringRelatedField()
    collection = serializers.StringRelatedField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'images',
                  'category', 'collection', 'createdAt', 'quantityInStock']
