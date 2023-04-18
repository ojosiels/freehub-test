from rest_framework import permissions
from .models import Usuario
from rest_framework.views import View


class UsuarioAdmin(permissions.BasePermission):
    def has_permission(self, request, view: View) -> bool:
        return bool(request.user.is_authenticated and request.user.is_superuser)


class UsuarioAdminOuApenasLeitura(permissions.BasePermission):
    def has_permission(self, request, view: View) -> bool:
        return bool(
            request.user.is_authenticated
            and request.user.is_superuser
            or request.method in permissions.SAFE_METHODS
        )


class ContaPertenceAoUsuarioOuUsuarioAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view: View, obj: Usuario) -> bool:
        return bool(
            request.user.is_authenticated
            and obj == request.user
            or request.user.is_authenticated
            and request.user.is_superuser
        )
