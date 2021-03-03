from rest_framework import serializers

from posts.models import PostsModel, CommentsModel, LikeModel

class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    class Meta:
        model = PostsModel
        fields = ['id', 'username', 'title', 'content', 'image', 'time']

class AddPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsModel
        fields = ['username', 'title', 'content', 'image', 'time']

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CharField()
    class Meta:
        model = CommentsModel
        fields = '__all__'

class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentsModel
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeModel
        fields = ['post', 'liker']