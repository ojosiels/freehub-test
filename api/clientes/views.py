from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Cliente
from .serializers import ClienteSerializer


class ClienteView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def filter_queryset(self, queryset):
        client_name = self.request.query_params.get("name", None)

        if client_name:
            return queryset.filter(name__contains=client_name)
        else:
            return queryset


class ClienteDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
