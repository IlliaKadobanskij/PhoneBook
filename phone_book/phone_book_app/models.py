from model_utils import Choices
from django.db import models


class CommunicationMethod(models.Model):
    NAME = Choices("phone", "telegram", "skype", "email")
    name = models.CharField(choices=NAME, default=NAME.phone, max_length=20)

    info = models.CharField(max_length=30, null=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Communication method"
        verbose_name_plural = "Communication methods"


class Profile(models.Model):
    contact_name = models.CharField(max_length=30)
    avatar = models.ImageField()
    communication_method = models.ManyToManyField(CommunicationMethod, blank=True)

    def __str__(self):
        return f"{self.contact_name}"

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"
        ordering = ["contact_name"]
