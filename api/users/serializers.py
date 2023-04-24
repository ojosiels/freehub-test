from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())],
    )

    def create(self, validated_data: dict) -> User:
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance: User, validated_data: dict) -> User:
        for key, value in validated_data.items():
            setattr(instance, key, value)
            if key == "password":
                instance.set_password(value)

        instance.save()
        return instance

    class Meta:
        model = User
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
