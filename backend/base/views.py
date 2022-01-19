from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',
    ]
    return Response(routes)


@api_view(['GET'])
def getProducts(request):
    products = ProductSerializer(Product.objects.all(), many=True)
    return Response(products.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = ProductSerializer(Product.objects.get(id=pk), many=False)
    return Response(product.data)
