from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.views import status

from datetime import date

from .models import Client
from .exceptions import CustomException

from users.serializers import UserSerializer


class ClientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    cpf = serializers.CharField(
        validators=[UniqueValidator(queryset=Client.objects.all())],
    )

    def validate(self, attrs):
        if bool(attrs["birth_date"] > date.today()):
            raise CustomException("Data Invalida", code=status.HTTP_400_BAD_REQUEST)

        return attrs

    def create(self, validated_data: dict) -> Client:
        client = Client.objects.create(**validated_data)
        return client

    def update(self, instance: Client, validated_data: dict) -> Client:
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        return instance

    class Meta:
        model = Client
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
