from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Cliente
from usuarios.serializers import UsuarioSerializer


class ClienteSerializer(serializers.ModelSerializer):
    # Validadores Extras
    user = UsuarioSerializer(read_only=True)
    cpf = serializers.CharField(
        validators=[UniqueValidator(queryset=Cliente.objects.all())],
    )

    # Sobrescrita de métodos "create" e "update"
    def create(self, validated_data: dict) -> Cliente:
        cliente = Cliente.objects.create(**validated_data)
        return cliente

    def update(self, instance: Cliente, validated_data: dict) -> Cliente:
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        return instance

    # Declaração do Meta ModelSerializer
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
