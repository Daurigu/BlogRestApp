from django.contrib import admin
from django.urls import path

from posts.views import (CreatePostsView,
                        GetUserPostsView,
                        GetAllPostsView, 
                        EditPostsView, 
                        GetFollowingPostsView,
                        CreateCommentView,
                        LikeView,
                        DeslikeView,
                        GetCommentView,
                        GetOthersUsersPostsView,
                        GetPostView)

urlpatterns = [
    path('create', CreatePostsView.as_view()),
    path('get', GetPostView.as_view()),
    path('mine', GetUserPostsView.as_view()),
    path('user/<str:pk>', GetOthersUsersPostsView.as_view()),
    path('all', GetAllPostsView.as_view()),
    path('following', GetFollowingPostsView.as_view()),
    path('edit/<int:pk>', EditPostsView.as_view()),
    path('comment', CreateCommentView.as_view()),
    path('get-comment/<int:pk>', GetCommentView.as_view()),
    path('like', LikeView.as_view()),
    path('deslike', DeslikeView.as_view()),
]

