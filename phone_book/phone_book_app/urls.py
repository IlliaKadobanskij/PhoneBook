from django.urls import path, include
from rest_framework.routers import DefaultRouter

from phone_book_app.views import ProfileViewSet, CommunicationMethodViewSet, CommunicationMethodList


router = DefaultRouter()
router.register(r"profiles", ProfileViewSet)
router.register(r"communication_methods", CommunicationMethodViewSet)


urlpatterns = [
    path("api/", include(router.urls)),
    path("api/list_communication_methods/", CommunicationMethodList.as_view({"post": "create", "put": "update"})),
]
