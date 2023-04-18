from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.views import status

from datetime import date

from .models import Cliente
from .exceptions import CustomException

from usuarios.serializers import UsuarioSerializer


class ClienteSerializer(serializers.ModelSerializer):
    user = UsuarioSerializer(read_only=True)
    cpf = serializers.CharField(
        validators=[UniqueValidator(queryset=Cliente.objects.all())],
    )

    def validate(self, attrs):
        if bool(attrs["birth_date"] > date.today()):
            raise CustomException("Data Invalida", code=status.HTTP_400_BAD_REQUEST)

        return attrs

    def create(self, validated_data: dict) -> Cliente:
        cliente = Cliente.objects.create(**validated_data)
        return cliente

    def update(self, instance: Cliente, validated_data: dict) -> Cliente:
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        return instance

    class Meta:
        model = Cliente
        fields = [
            "id",
            "name",
            "cpf",
            "family_income",
            "birth_date",
            "date_joined",
            "user",
        ]

        read_only_fields = [
            "id",
            "user",
            "date_joined",
        ]
