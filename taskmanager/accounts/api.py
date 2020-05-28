from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
# if __name__ == "__main__" and __package__ is None:  # nopep8
#     from sys import path  # nopep8
#     from os.path import dirname as dir  # nopep8

#     path.append(dir(path[0]))  # nopep8
from tasks.models import UserProjectMapping  # nopep8
# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        UserProjectMapping.objects.create(username=user.username)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            # AuthToken create returns (instance, token)
            "token": AuthToken.objects.create(user)[1]
        })

# Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            # AuthToken create returns (instance, token)
            "token": AuthToken.objects.create(user)[1]
        })

# Get User API


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
