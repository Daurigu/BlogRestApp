from django.contrib import admin

from posts.models import PostsModel, CommentsModel, LikeModel

# Register your models here.
admin.site.register(PostsModel)
admin.site.register(CommentsModel)
admin.site.register(LikeModel)