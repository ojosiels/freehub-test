from rest_framework import generics

from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Usuario
from .serializers import UsuarioSerializer
from .permissions import ContaPertenceAoUsuario, EstaAutenticadoOuPost


class UsuarioView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [EstaAutenticadoOuPost]

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [ContaPertenceAoUsuario]

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
