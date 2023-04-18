from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=Usuario.objects.all())],
    )

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

    class Meta:
        model = Usuario
        fields = [
            "id",
            "name",
            "username",
            "email",
            "password",
        ]

        read_only_fields = [
            "id",
        ]

        extra_kwargs = {
            "password": {"write_only": True},
        }
