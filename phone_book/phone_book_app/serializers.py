import re

from rest_framework import serializers
from phone_book_app.models import Profile, CommunicationMethod

from phone_book.mongo_connector import delete_image


class CommunicationMethodSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = CommunicationMethod
        fields = ["id", "profile", "name", "info"]

    def validate(self, data):
        if data["name"] == "phone":
            if not re.match(r"^[+][0-9]{1,12}$", data["info"]):
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

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.info = validated_data.get("info", instance.info)
        instance.save()

        return instance


class ProfileSerializer(serializers.ModelSerializer):
    communication_methods = CommunicationMethodSerializer(many=True, read_only=True)
    avatar_info = serializers.CharField(source="get_base64_image", read_only=True)

    class Meta:
        model = Profile
        fields = ["id", "communication_methods", "contact_name", "avatar", "avatar_info"]

        extra_kwargs = {
            # "avatar": {"write_only": True},
        }

    # def update(self, instance, validated_data):
    #     prev_avatar = instance.avatar
    #     instance.contact_name = validated_data.get('contact_name', instance.contact_name)
    #     instance.avatar = validated_data.get('avatar', instance.avatar)
    #
    #     if prev_avatar:
    #         delete_image(str(prev_avatar))
    #
    #     instance.save()
    #
    #     return instance
