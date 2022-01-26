from rest_framework import serializers

from phone_book_app.models import Profile, CommunicationMethod


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id", "contact_name", "phone_number", "avatar", "communication_method"]

        def validate(self, data):
            if len(data["contact_name"]) < 4:
                raise serializers.ValidationError("Contact name must contain more than 4 characters")


class CommunicationMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunicationMethod
        fields = ["id", "communication_name"]
