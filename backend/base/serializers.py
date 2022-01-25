from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken

from django.contrib.auth.models import User
from .models import *


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializers = UserWithTokenSerializer(self.user).data
        for key, value in serializers.items():
            data[key] = value
        return data


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'password', 'isAdmin']

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserWithTokenSerializer(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'password', 'isAdmin', 'token']

    def get_token(self, obj):
        token = AccessToken.for_user(obj)
        return str(token)


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
