from model_utils import Choices
from django.db import models


class Profile(models.Model):
    contact_name = models.CharField(max_length=30)
    avatar = models.ImageField()

    def __str__(self):
        return f"{self.contact_name}"

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"
        ordering = ["contact_name"]


class CommunicationMethod(models.Model):
    NAME = Choices("phone", "telegram", "skype", "email")
    name = models.CharField(choices=NAME, default=NAME.phone, max_length=20)

    profile = models.ForeignKey(Profile, related_name="communication_methods", on_delete=models.CASCADE)
    info = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Communication method"
        verbose_name_plural = "Communication methods"
