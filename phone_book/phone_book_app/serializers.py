import re
from rest_framework import serializers
from phone_book_app.models import Profile, CommunicationMethod


class CommunicationMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunicationMethod
        fields = ["id", "profile", "name", "info"]

    def validate(self, data):
        if data["name"] == "phone":
            if not re.match(r"^[+][0-9]{1,13}$", data["info"]):
                raise serializers.ValidationError("Phone number is not valid")

        elif data["name"] == "telegram":
            if not re.match(r"^@+[a-zA-Z1-9_]*$", data["info"]):
                raise serializers.ValidationError("Telegram username is not valid")

        elif data["name"] == "skype":
            if not re.match(r"^live:+[a-zA-Z1-9_]*$", data["info"]):
                raise serializers.ValidationError("Skype username is not valid")

        elif data["name"] == "email":
            if not re.match(r"^[\w]+@([\w-]+\.)+[\w-]{2,4}$", data["info"]):
                raise serializers.ValidationError("Email address is not valid")

        return data


class ProfileSerializer(serializers.ModelSerializer):
    communication_methods = CommunicationMethodSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ["id", "communication_methods", "contact_name", "avatar"]
