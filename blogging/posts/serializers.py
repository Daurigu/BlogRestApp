from rest_framework import serializers

from posts.models import PostsModel

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsModel
        field = '__all__'