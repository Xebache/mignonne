from decimal import Decimal

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Image, Category, Collection
from base.serializers import ProductSerializer, ImageSerializer


@api_view(['GET'])
def getProducts(request):
    serializer = ProductSerializer(Product.objects.all(), many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    serializer = ProductSerializer(Product.objects.get(id=pk), many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data

    print("category", data['category']['id'])

    product = Product.objects.get(id=pk)
    product.name = data['name']
    product.description = data['description']
    product.price = Decimal(data['price'])
    product.category = Category.objects.get(id=data['category']['id'])
    product.collection = Collection.objects.get(id=data['collection']['id'])
    product.quantityInStock = data['quantityInStock']
    product.save()

    images = data["images"]
    for image in images:
        updateImage(image)

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    data = request.data

    product = Product.objects.create(
        name=data['name'],
        description=data['description'],
        price=data['price'],
        category=Category.objects.get(id=data['category']['id']),
        collection=Collection.objects.get(id=data['collection']['id']),
        quantityInStock=data['quantityInStock']
    )

    images = data["images"]
    for image in images:
        image["product"] = product
        updateImage(image)

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response('product deleted')


@api_view(['POST'])
# @permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(id=product_id)
    images = product.images.all()
    print("IMAGES", len(images))
    isMain = len(images) == 0
    image = Image.objects.create(
        path=request.FILES.get('image'),
        product=product,
        isMain=isMain
    )
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteImage(request, pk):
    image = Image.objects.get(id=pk)
    image.delete()
    return Response('image deleted')


def updateImage(data):
    image = Image.objects.get(id=data["id"])
    image.isMain = data["isMain"]
    image.save()
