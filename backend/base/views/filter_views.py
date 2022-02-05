from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Category, Collection
from base.serializers import CategorySerializer, CollectionSerializer

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getCategories(request):
    serializer = CategorySerializer(Category.objects.all(), many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCategory(request, pk):
    data = request.data
    category = Category.objects.get(id=pk)
    category.name = data['name']
    category.save()
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def createCategory(request, pk):
    data = request.data
    category = Category.objects.create(
        name = data['name']
    )
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getCollections(request):
    serializer = CollectionSerializer(Collection.objects.all(), many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCollection(request, pk):
    data = request.data
    collection = Collection.objects.get(id=pk)
    collection.name = data['name']
    collection.save()
    serializer = CollectionSerializer(collection, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def createCollection(request, pk):
    data = request.data
    collection = Collection.objects.create(
        name = data['name']
    )
    serializer = CollectionSerializer(collection, many=False)
    return Response(serializer.data)