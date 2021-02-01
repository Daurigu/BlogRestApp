from rest_framework import serializers

from posts.models import PostsModel, CommentsModel, LikeModel

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsModel
        fields = ['username', 'title', 'content', 'image']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentsModel
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeModel
        fields = ['post', 'liker']