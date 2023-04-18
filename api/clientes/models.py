from django.db import models


class Cliente(models.Model):
    name = models.CharField(max_length=128)
    cpf = models.CharField(max_length=11)
    family_income = models.DecimalField()
    birth_date = models.DateField()
    date_joined = models.DateField(auto_now_add=True)
    user = models.ForeignKey(
        "usuarios.usuario", related_name="clients", on_delete=models.SET_NULL
    )
