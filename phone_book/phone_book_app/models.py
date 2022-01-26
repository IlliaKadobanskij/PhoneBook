from django.core.files.storage import FileSystemStorage
from django.db import models


class CommunicationMethod(models.Model):
    communication_name = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.communication_name}"

    class Meta:
        verbose_name = "Communication method"
        verbose_name_plural = "Communication methods"


class Profile(models.Model):
    contact_name = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=15)
    avatar = models.ImageField()
    communication_method = models.ManyToManyField(CommunicationMethod, blank=True)

    def __str__(self):
        return f"{self.contact_name}"

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"
        ordering = ["contact_name"]
