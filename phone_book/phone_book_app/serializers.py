import re

from rest_framework import serializers
from phone_book_app.models import Profile, CommunicationMethod
from django.db import transaction


class CommunicationMethodSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = CommunicationMethod
        fields = ["id", "profile", "name", "info"]

        read_only_fields = ("profile",)

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
    communication_methods = CommunicationMethodSerializer(many=True, required=False)
    avatar_info = serializers.CharField(source="get_base64_image", read_only=True)

    class Meta:
        model = Profile
        fields = ["id", "communication_methods", "contact_name", "avatar", "avatar_info"]

        extra_kwargs = {
            "avatar": {"write_only": True},
        }

    @transaction.atomic
    def create(self, validated_data):
        communication_methods = None

        if "communication_methods" in validated_data.keys():
            communication_methods = validated_data.pop("communication_methods")

        profile = Profile.objects.create(**validated_data)
        if communication_methods:
            for method in communication_methods:
                CommunicationMethod.objects.create(**method, profile=profile)
        return profile

        # def update(self, instance, validated_data):
        #     communication_methods = validated_data.pop('communication_methods')
        #     instance.contact_name = validated_data.get('contact_name', instance.contact_name)
        #     instance.avatar = validated_data.get('avatar', instance.avatar)
        #     instance.save()
        #
        #     keep_methods = []
        #     existing_ids = [m.id for m in instance.communication_methods]
        #
        #     for method in communication_methods:
        #         if 'id' in method.keys():
        #             if CommunicationMethod.objects.filter(id=method['id']).exists():
        #                 m = CommunicationMethod.objects.get(id=method['id'])
        #                 m. =
