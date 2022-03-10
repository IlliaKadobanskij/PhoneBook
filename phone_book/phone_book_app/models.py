from model_utils import Choices
from django.db import models
from gridfs_storage.storage import GridFSStorage
import base64


class Profile(models.Model):
    contact_name = models.CharField(max_length=30)
    avatar = models.ImageField(storage=GridFSStorage(base_url="/"), blank=True, null=True)

    def get_base64_image(self):
        return str(base64.b64encode(self.avatar.read()).decode())

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
