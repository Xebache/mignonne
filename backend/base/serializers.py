from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

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
        name = obj.first_name + " " + obj.last_name
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
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'path', 'isMain']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['__all__']


class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    category = serializers.StringRelatedField()
    collection = serializers.StringRelatedField()
    createdAt = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'images',
                  'category', 'collection', 'createdAt', 'quantityInStock']

    def get_createdAt(self, obj):
        return obj.createdAt.strftime('%d/%m/%Y')
