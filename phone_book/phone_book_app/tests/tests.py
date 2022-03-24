from collections import OrderedDict

from rest_framework.test import APIRequestFactory, APIClient

from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile

from phone_book.mongo_connector import delete_image
from phone_book_app.models import Profile, CommunicationMethod
import os


class PhoneBookTestCases(TestCase):
    factory = APIRequestFactory()

    test_image_path = os.path.join(os.path.dirname(__file__), "test_image.png")
    test_image = SimpleUploadedFile(
        name="test_image", content=open(test_image_path, "rb").read(), content_type="image/png"
    )

    def setUp(self):
        self.profile = Profile.objects.create(contact_name="illia")
        self.profile.avatar = self.test_image
        self.profile.save()

        self.method = CommunicationMethod.objects.create(name="phone", info="+380633237043", profile=self.profile)

    def tearDown(self):
        try:
            delete_image(self.test_image.name)
        except TypeError:
            pass

    def test_profile_get(self):
        response = self.client.get(f"/api/profiles/{self.profile.id}/")
        self.assertEqual(response.data["contact_name"], self.profile.contact_name)
        self.assertEqual(response.data["avatar"].split("/")[-1], self.test_image.name)

    def test_profile_post(self):
        image = SimpleUploadedFile(
            name="test_post_image.png", content=open(self.test_image_path, "rb").read(), content_type="image/png"
        )

        data = {"contact_name": "illia2", "avatar": image}

        response = self.client.post("/api/profiles/", data=data)

        self.assertEqual(response.data["contact_name"], data["contact_name"])
        self.assertEqual(response.data["avatar"].split("/")[-1], image.name)

        delete_image(image.name)

    def test_profile_put(self):
        client = APIClient()

        image = SimpleUploadedFile(
            name="test_put_image.png", content=open(self.test_image_path, "rb").read(), content_type="image/png"
        )

        data = {"contact_name": "illia3", "avatar": image}

        response = client.put(f"/api/profiles/{self.profile.id}/", data=data)

        self.assertEqual(response.data["contact_name"], data["contact_name"])
        self.assertEqual(response.data["avatar"].split("/")[-1], image.name)

        delete_image(image.name)

    def test_profile_patch(self):
        client = APIClient()

        data = {"contact_name": "illia4"}

        response = client.patch(f"/api/profiles/{self.profile.id}/", data=data)

        self.assertEqual(response.data["contact_name"], "illia4")

    def test_profile_delete(self):
        client = APIClient()
        profile_id = self.profile.id

        response = client.delete(f"/api/profiles/{profile_id}/")
        response_get = client.get(f"/api/profiles/{profile_id}/")

        self.assertEqual(response.status_code, 204)
        self.assertEqual(response_get.status_code, 404)

    def test_communication_method_get(self):
        response = self.client.get(f"/api/communication_methods/{self.method.id}/")

        self.assertEqual(response.data["name"], self.method.name)
        self.assertEqual(response.data["info"], self.method.info)
        self.assertEqual(response.data["profile"], self.method.profile.id)

    def test_communication_method_post(self):
        data = {"name": "telegram", "info": "@illia", "profile": self.profile.id}

        response = self.client.post("/api/communication_methods/", data=data)

        self.assertEqual(response.data["name"], data["name"])
        self.assertEqual(response.data["info"], data["info"])
        self.assertEqual(response.data["profile"], data["profile"])

    def test_communication_method_put(self):
        client = APIClient()

        data = {"name": "telegram", "info": "@illia", "profile": self.profile.id}

        response = client.put(f"/api/communication_methods/{self.method.id}/", data=data)

        self.assertEqual(response.data["name"], data["name"])
        self.assertEqual(response.data["info"], data["info"])
        self.assertEqual(response.data["profile"], data["profile"])

    def test_communication_method_patch(self):
        client = APIClient()

        data = {"name": "skype", "info": "live:illia"}

        response = client.patch(f"/api/communication_methods/{self.method.id}/", data=data)

        self.assertEqual(response.data["name"], data["name"])
        self.assertEqual(response.data["info"], data["info"])

    def test_communication_method_delete(self):
        method_id = self.method.id

        response = self.client.delete(f"/api/communication_methods/{method_id}/")
        response_get = self.client.get(f"/api/communication_methods/{method_id}/")

        self.assertEqual(response.status_code, 204)
        self.assertEqual(response_get.status_code, 404)

    def test_nested_fields_get(self):
        response = self.client.get(f"/api/profiles/{self.profile.id}/")

        self.assertEqual(response.data["contact_name"], self.profile.contact_name)
        self.assertEqual(response.data["avatar"].split("/")[-1], self.test_image.name)

        self.assertEqual(
            response.data["communication_methods"][0],
            OrderedDict(
                [("id", self.method.id), ("profile", self.profile.id), ("name", "phone"), ("info", "+380633237043")]
            ),
        )
