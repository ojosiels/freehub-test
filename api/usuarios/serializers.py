from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    # Validadores Extras
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=Usuario.objects.all())],
    )

    # Sobrescrita de métodos "create" e "update"
    def create(self, validated_data: dict) -> Usuario:
        usuario = Usuario.objects.create_user(**validated_data)
        return usuario

    def update(self, instance: Usuario, validated_data: dict) -> Usuario:
        for key, value in validated_data.items():
            setattr(instance, key, value)
            if key == "password":
                instance.set_password(value)

        instance.save()
        return instance

    # Declaração do Meta ModelSerializer
    class Meta:
        model = Usuario
        fields = [
            "id",
            "name",
            "username",
            "email",
            "password",
            "is_superuser",
        ]

        read_only_fields = [
            "id",
            "is_superuser",
        ]

        extra_kwargs = {
            "password": {"write_only": True},
        }
