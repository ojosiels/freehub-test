from django.urls import path

from .views import ClienteView, ClienteDetailView

urlpatterns = [
    path("clients/", ClienteView.as_view()),
    path("clients/<int:user_id>/", ClienteDetailView.as_view()),
]
