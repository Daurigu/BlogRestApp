from django.contrib import admin
from django.urls import path

from users.views import (RegisterView,
                        GetSCRFToken, 
                        LoginView, 
                        LogoutView, 
                        DeleteUserView, 
                        GetUsersView, 
                        UpdateUserProfileView, 
                        GetUserProfile, 
                        FollowView,
                        UnfollowView,
                        GetFollowingView,
                        GetFollowerView,
                        GetOtherUserProfile,
                        GetOthersFollowingView,
                        GetOthersFollowerView,
                        GetIfFollowView)

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('delete', DeleteUserView.as_view()),
    path('all', GetUsersView.as_view()),
    path('update-profile', UpdateUserProfileView.as_view()),
    path('profile', GetUserProfile.as_view()),
    path('profile/<str:pk>', GetOtherUserProfile.as_view()),
    path('follow', FollowView.as_view()),
    path('unfollow', UnfollowView.as_view()),
    path('following', GetFollowingView.as_view()),
    path('follower', GetFollowerView.as_view()),
    path('following/<str:pk>', GetOthersFollowingView.as_view()),
    path('follower/<str:pk>', GetOthersFollowerView.as_view()),
    path('csrf', GetSCRFToken.as_view()),
    path('if-follow', GetIfFollowView.as_view()),
]

