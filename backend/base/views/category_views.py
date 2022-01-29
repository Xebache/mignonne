from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Category
from base.serializers import CategorySerializer

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getCategories(request):
    serializer = CategorySerializer(Category.objects.all(), many=True)
    return Response(serializer.data)