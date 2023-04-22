from rest_framework import permissions
from .models import Usuario
from rest_framework.views import View


class ContaPertenceAoUsuario(permissions.BasePermission):
    def has_object_permission(self, request, view: View, obj: Usuario) -> bool:
        return bool(request.user.is_authenticated and obj == request.user)
