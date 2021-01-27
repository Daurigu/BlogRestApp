from rest_framework import serializers
from django.contrib.auth.models import User

from users.models import UserProfileModel, UserFollowsModel

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfileModel
        fields = ['name', 'profile_pic', 'email', 'about']

class UserFollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowsModel
        fields = ['user_id', 'following_user_id']