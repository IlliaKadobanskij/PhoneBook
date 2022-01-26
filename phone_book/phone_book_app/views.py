from rest_framework import viewsets

from phone_book_app.models import Profile, CommunicationMethod
from phone_book_app.serializers import ProfileSerializer, CommunicationMethodSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class CommunicationMethodViewSet(viewsets.ModelViewSet):
    queryset = CommunicationMethod.objects.all()
    serializer_class = CommunicationMethodSerializer
