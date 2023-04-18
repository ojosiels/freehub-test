from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True, max_length=50)
