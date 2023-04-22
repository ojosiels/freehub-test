from django.urls import path

from .views import ClienteView, ClienteDetailView, ReportView

urlpatterns = [
    path("clients/", ClienteView.as_view()),
    path("clients/<int:user_id>/", ClienteDetailView.as_view()),
    # Rota utilizada para buscar o relatório
    path("report/", ReportView.as_view()),
]
