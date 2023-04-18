from django.db import models


class Cliente(models.Model):
    name = models.CharField(max_length=150)
    cpf = models.CharField(max_length=10)
    family_income = models.DecimalField(decimal_places=2, max_digits=8, null=True)
    birth_date = models.DateField()
    date_joined = models.DateField(auto_now_add=True)
    user = models.ForeignKey(
        "usuarios.usuario", related_name="clients", on_delete=models.SET_NULL, null=True
    )
