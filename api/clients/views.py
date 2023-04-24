from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView, Request, Response, status


from rest_framework_simplejwt.authentication import JWTAuthentication


from .models import Client
from .serializers import ClientSerializer


from datetime import date, timedelta


class ClientView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def filter_queryset(self, queryset):
        client_name = self.request.query_params.get("name", None)
        client_income = self.request.query_params.get("family_income", None)

        if client_name:
            return queryset.filter(name__contains=client_name)
        elif client_income:
            return queryset.filter(family_income=client_income)
        else:
            return queryset


class ClientDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ReportView(APIView):
    def get(self, request: Request):
        def calculate_average_income(client_list: list[Client]):
            total_income = 0

            for client in client_list:
                total_income = total_income + float(client["family_income"])

            if len(client_list) == 0 or total_income == 0:
                return 0

            average_income = round((total_income / len(client_list)), 2)

            return average_income

        def calculate_high_income_clients(
            client_list: list[Client], average_income: int
        ):
            high_income_clients = []

            for client in client_list:
                if float(client["family_income"]) > average_income:
                    high_income_clients.append(client)

            return high_income_clients

        adult_birth_date = date.today() - timedelta(days=6575)

        # Filtros de todo o Banco de Dados
        all_clients = Client.objects.all()
        serialized_clients = ClientSerializer(all_clients, many=True).data
        all_clients_average_income = calculate_average_income(serialized_clients)

        # Filtros do Mês
        past_month = date.today() - timedelta(days=30)

        month_all_adult_clients = Client.objects.filter(
            date_joined__gte=past_month, birth_date__lte=adult_birth_date
        )

        serialized_month_all_adult_clients = ClientSerializer(
            month_all_adult_clients, many=True
        ).data

        month_high_income_clients = calculate_high_income_clients(
            serialized_month_all_adult_clients, all_clients_average_income
        )

        month_class_a = Client.objects.filter(
            date_joined__gte=past_month, family_income__lte=980.00
        )
        month_class_b = Client.objects.filter(
            date_joined__gte=past_month,
            family_income__gt=980.00,
            family_income__lte=2500.00,
        )
        month_class_c = Client.objects.filter(
            date_joined__gte=past_month, family_income__gt=2500.00
        )

        # Filtros da Semana
        past_week = date.today() - timedelta(days=30)

        week_all_adult_clients = Client.objects.filter(
            date_joined__gte=past_week, birth_date__lte=adult_birth_date
        )

        serialized_week_all_adult_clients = ClientSerializer(
            week_all_adult_clients, many=True
        ).data

        week_high_income_clients = calculate_high_income_clients(
            serialized_week_all_adult_clients, all_clients_average_income
        )

        week_class_a = Client.objects.filter(
            date_joined__gte=past_week, family_income__lte=980.00
        )
        week_class_b = Client.objects.filter(
            date_joined__gte=past_week,
            family_income__gt=980.00,
            family_income__lte=2500.00,
        )
        week_class_c = Client.objects.filter(
            date_joined__gte=past_week, family_income__gt=2500.00
        )

        # FIltros de Hoje
        today = date.today()

        today_all_adult_clients = Client.objects.filter(
            date_joined__gte=today, birth_date__lte=adult_birth_date
        )

        serialized_today_all_adult_clients = ClientSerializer(
            today_all_adult_clients, many=True
        ).data

        today_high_income_clients = calculate_high_income_clients(
            serialized_today_all_adult_clients, all_clients_average_income
        )

        today_class_a = Client.objects.filter(
            date_joined__gte=today, family_income__lte=980.00
        )
        today_class_b = Client.objects.filter(
            date_joined__gte=today, family_income__gt=980.00, family_income__lte=2500.00
        )
        today_class_c = Client.objects.filter(
            date_joined__gte=today, family_income__gt=2500.00
        )

        res = {
            "month": {
                "high_income_clients": len(month_high_income_clients),
                "a_clients": len(month_class_a),
                "b_clients": len(month_class_b),
                "c_clients": len(month_class_c),
            },
            "week": {
                "high_income_clients": len(week_high_income_clients),
                "a_clients": len(week_class_a),
                "b_clients": len(week_class_b),
                "c_clients": len(week_class_c),
            },
            "today": {
                "high_income_clients": len(today_high_income_clients),
                "a_clients": len(today_class_a),
                "b_clients": len(today_class_b),
                "c_clients": len(today_class_c),
            },
        }

        return Response(res, status=status.HTTP_200_OK)
