from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Image, Category, Collection
from base.serializers import ProductSerializer


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
    product = Product.objects.get(id=pk)

    product.name=data['name'],
    product.description=data['description'],
    product.price=data['price'],
    product.category=Category.objects.get(id=data['category']),
    product.collection=Collection.objects.get(id=data['collection']),
    product.quantityInStock=data['quantityInStock']

    product.save()

    # UPDATE IMAGES !!!!
    # if(len(data['images']) > 0):
    #     for dataImage in data['images']:
    #         image = Image.objects.create(
    #             product=product.id,
    #             path=dataImage.path,
    #             isMain=dataImage.isMain
    #         )

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
        category=Category.objects.get(id=data['category']),
        collection=Collection.objects.get(id=data['collection']),
        quantityInStock=data['quantityInStock']
    )
    # if(len(data['images']) > 0):
    #     for dataImage in data['images']:
    #         Image.objects.create(
    #             product=product.id,
    #             path=dataImage.path,
    #             isMain=dataImage.isMain
    #         )
    # else:
    #     Image.objects.create(
    #         product=product.id,
    #         isMain=True
    #     )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response('product deleted')

@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(id=product_id)
