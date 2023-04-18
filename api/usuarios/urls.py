from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import UsuarioView, UsuarioDetailView

urlpatterns = [
    # Rotas utilizadas para Autenticação do Usuário
    path("login/", TokenObtainPairView.as_view()),
    path("refresh/", TokenRefreshView.as_view()),
    # Rotas utilizadas para Cadastro, Listagem, Atualização e Deleção de Usuários
    path("users/", UsuarioView.as_view()),
    path("users/<int:id>/", UsuarioDetailView.as_view()),
]
