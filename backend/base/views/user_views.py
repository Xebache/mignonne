from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status


from base.serializers import MyTokenObtainPairSerializer, UserSerializer, UserWithTokenSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    # def post(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)

    #     try:
    #         serializer.is_valid(raise_exception=True)
    #     except ValidationError as error:
    #         raise AuthenticationFailed(e.args[0])

    #       # set access token in browser with Httponly cookie.
    #     res = Response(serializer.validated_data, status=status.HTTP_200_OK)
    #     access_token = serializer.validated_data['access']
    #     res.set_cookie("access_token", access_token, max_age=settings.SIMPLE_JWT.get('ACCESS_TOKEN_LIFETIME').total_seconds(),samesite='Lax',secure=False, httponly=True)

    #     return res


@api_view(["POST"])
def signup(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data["name"],
            username=data["email"],
            email=data["email"],
            password=make_password(data["password"])
        )
        serializer = UserWithTokenSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {"detail": "L'email existe déjà"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    # print(request.COOKIES.get("currentUser"))
    user = request.user
    serializer = UserWithTokenSerializer(user, many=False)

    data = request.data
    user.username = data["email"]
    user.email = data["email"]
    user.first_name = data["name"]
    # user.last_name = data["lastname"]
    if data["password"] != "":
        user.password = make_password(data["password"])

    user.save()

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
