from django.contrib import admin

from phone_book_app.models import Profile, CommunicationMethod

admin.site.register(Profile)
admin.site.register(CommunicationMethod)
