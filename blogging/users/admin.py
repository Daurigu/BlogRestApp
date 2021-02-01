from django.contrib import admin
from users.models import UserProfileModel, UserFollowsModel

# Register your models here.

admin.site.register(UserProfileModel)
admin.site.register(UserFollowsModel)