from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView, Request, Response, status


from rest_framework_simplejwt.authentication import JWTAuthentication


from .models import Cliente
from .serializers import ClienteSerializer


from datetime import date, timedelta


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


class ReportView(APIView):
    def get(self, request: Request):
        def calculate_average_income(client_list: list[Cliente]):
            total_income = 0

            for client in client_list:
                total_income = total_income + float(client["family_income"])

            average_income = round((total_income / len(client_list)), 2)

            return average_income

        def calculate_high_income_clients(
            client_list: list[Cliente], average_income: int
        ):
            high_income_clients = []

            for client in client_list:
                if float(client["family_income"]) > average_income:
                    high_income_clients.append(client)

            return high_income_clients

        adult_birth_date = date.today() - timedelta(days=6575)

        # Filtros do Mês
        past_month = date.today() - timedelta(days=30)

        month_all_clients = Cliente.objects.filter(date_joined__gte=past_month)
        month_all_adult_clients = Cliente.objects.filter(
            date_joined__gte=past_month, birth_date__lte=adult_birth_date
        )

        serialized_month_all_clients = ClienteSerializer(
            month_all_clients, many=True
        ).data
        serialized_month_all_adult_clients = ClienteSerializer(
            month_all_adult_clients, many=True
        ).data

        month_average_income = calculate_average_income(serialized_month_all_clients)
        month_high_income_clients = calculate_high_income_clients(
            serialized_month_all_adult_clients, month_average_income
        )

        month_class_a = Cliente.objects.filter(
            date_joined__gte=past_month, family_income__lte=980.00
        )
        month_class_b = Cliente.objects.filter(
            date_joined__gte=past_month,
            family_income__gt=980.00,
            family_income__lte=2500.00,
        )
        month_class_c = Cliente.objects.filter(
            date_joined__gte=past_month, family_income__gt=2500.00
        )

        # Filtros da Semana
        past_week = date.today() - timedelta(days=30)

        week_all_clients = Cliente.objects.filter(date_joined__gte=past_week)
        week_all_adult_clients = Cliente.objects.filter(
            date_joined__gte=past_week, birth_date__lte=adult_birth_date
        )

        serialized_week_all_clients = ClienteSerializer(
            week_all_clients, many=True
        ).data
        serialized_week_all_adult_clients = ClienteSerializer(
            week_all_adult_clients, many=True
        ).data

        week_average_income = calculate_average_income(serialized_week_all_clients)
        week_high_income_clients = calculate_high_income_clients(
            serialized_week_all_adult_clients, week_average_income
        )

        week_class_a = Cliente.objects.filter(
            date_joined__gte=past_week, family_income__lte=980.00
        )
        week_class_b = Cliente.objects.filter(
            date_joined__gte=past_week,
            family_income__gt=980.00,
            family_income__lte=2500.00,
        )
        week_class_c = Cliente.objects.filter(
            date_joined__gte=past_week, family_income__gt=2500.00
        )

        # FIltros de Hoje
        today = date.today()

        today_all_clients = Cliente.objects.filter(date_joined__gte=today)
        today_all_adult_clients = Cliente.objects.filter(
            date_joined__gte=today, birth_date__lte=adult_birth_date
        )

        serialized_today_all_clients = ClienteSerializer(
            today_all_clients, many=True
        ).data
        serialized_today_all_adult_clients = ClienteSerializer(
            today_all_adult_clients, many=True
        ).data

        today_average_income = calculate_average_income(serialized_today_all_clients)
        today_high_income_clients = calculate_high_income_clients(
            serialized_today_all_adult_clients, today_average_income
        )

        today_class_a = Cliente.objects.filter(
            date_joined__gte=today, family_income__lte=980.00
        )
        today_class_b = Cliente.objects.filter(
            date_joined__gte=today, family_income__gt=980.00, family_income__lte=2500.00
        )
        today_class_c = Cliente.objects.filter(
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
