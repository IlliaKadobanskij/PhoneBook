from django.db import transaction
from rest_framework import viewsets, status

from phone_book_app.models import Profile, CommunicationMethod
from phone_book_app.serializers import ProfileSerializer, CommunicationMethodSerializer

from phone_book.mongo_connector import delete_image
from rest_framework.response import Response


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_destroy(self, instance):
        if instance.avatar:
            delete_image(str(instance.avatar))
        instance.delete()


class CommunicationMethodViewSet(viewsets.ModelViewSet):
    queryset = CommunicationMethod.objects.all()
    serializer_class = CommunicationMethodSerializer


class CommunicationMethodList(viewsets.GenericViewSet):
    serializer_class = CommunicationMethodSerializer
    queryset = CommunicationMethod.objects.all()

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        for method in request.data:
            serializer = self.get_serializer(data=method)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(request.data, status=status.HTTP_201_CREATED)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        if methods := request.data:
            profile_id = methods[0]["profile"]
            prev_methods = CommunicationMethod.objects.filter(profile=profile_id)
            if prev_methods:
                prev_methods.delete()

        for method in request.data:
            serializer = self.get_serializer(data=method)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(request.data, status=status.HTTP_201_CREATED)
