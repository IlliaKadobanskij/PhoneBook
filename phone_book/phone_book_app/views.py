from rest_framework import viewsets

from phone_book_app.models import Profile, CommunicationMethod
from phone_book_app.serializers import ProfileSerializer, CommunicationMethodSerializer

from phone_book.mongo_connector import delete_image


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_destroy(self, instance):
        delete_image(str(instance.avatar))
        instance.delete()


class CommunicationMethodViewSet(viewsets.ModelViewSet):
    queryset = CommunicationMethod.objects.all()
    serializer_class = CommunicationMethodSerializer
