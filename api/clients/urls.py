from django.urls import path

from .views import ClientView, ClientDetailView, ReportView

urlpatterns = [
    path("clients/", ClientView.as_view()),
    path("clients/<int:pk>/", ClientDetailView.as_view()),
    path("report/", ReportView.as_view()),
]
