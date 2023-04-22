from rest_framework import generics

from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Usuario
from .serializers import UsuarioSerializer
from .permissions import ContaPertenceAoUsuario


class UsuarioView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication]

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [ContaPertenceAoUsuario]

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
