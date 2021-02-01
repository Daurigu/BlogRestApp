from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout

from users.models import UserFollowsModel
from posts.models import PostsModel, CommentsModel, LikeModel
from posts.serializers import PostSerializer, CommentSerializer, LikeSerializer
from users.serializers import UserFollowerSerializer



@method_decorator(ensure_csrf_cookie, name='dispatch')
class CreatePostsView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        data = self.request.data
        data['username'] = self.request.user.id
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'post': 'Created Successfully'})
        return Response({'post': 'There was an error! Please try again.', 'error': serializer.errors})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class EditPostsView(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, pk, format=None):
        try:
            data = self.request.data
            user_id = self.request.user.id
            
            obj = PostsModel.objects.get(id=pk)
            
            if obj.username.id == user_id:
                data['username'] = user_id
                if obj is not None:
                    serializer = PostSerializer(obj, data=request.data)
                else:
                    return Response({'post': 'There was an error finding that post! Please try again.'})

                if serializer.is_valid():
                    serializer.save()
                    return Response({'username': request.user.username, 'data': serializer.data})
                return Response({'post': 'There was an error! Please try again.', 'error': serializer.errors})
            else:
                return Response({'post': 'You can not edit that post'})
        except:
            return Response({'post': 'There was an error. Please check your data and try again.'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetUserPostsView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        data = PostsModel.objects.filter(username=self.request.user.id)
        user = User.objects.get(id=self.request.user.id)
        serializer = PostSerializer(data, many=True)
        return Response({'username': user.username, 'data': serializer.data})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetAllPostsView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        data = PostsModel.objects.all()
        user = User.objects.get(id=self.request.user.id)
        serializer = PostSerializer(data, many=True)
        return Response({'username': user.username, 'data': serializer.data})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetFollowingPostsView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        try:
            user = self.request.user
            user_profile = User.objects.get(id=user.id)
            user = User.objects.get(id=self.request.user.id)

            serializer = UserFollowerSerializer(user_profile.following.all(), many=True)
            newData = []

            for i in user_profile.following.all():
                print(i.following_user_id.id)
                data = PostsModel.objects.filter(username=i.following_user_id.id)
                serializer = PostSerializer(data, many=True)
                newData = newData + serializer.data

            return Response({'username': user.username, 'data': newData})
        except:
            return Response({'post': 'There was an error. Please check your data and try again.'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class CreateCommentView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        try:
            user = self.request.user
            data = self.request.data

            data['user'] = user.id
            
            serializer = CommentSerializer(data = data)
            if serializer.is_valid():
                serializer.save()
                return Response({'comment': serializer.data})

            return Response({'comment': serializer.errors})
        except:
            return Response({'error': 'There was an error! please ty again.'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCommentView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pk, format=None):
        obj = CommentsModel.objects.filter(post=pk)

        if obj:
            serializer = CommentSerializer(obj, many=True)
            return Response({'comments': serializer.data})
        return Response({'comments': ''})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class LikeView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        try:
            user = self.request.user
            data = self.request.data

            data['liker'] = user.id

            verification = LikeModel.objects.filter(liker=data['liker'], post=data['post'])

            if not verification:
                serializer = LikeSerializer(data=data)
                
                if serializer.is_valid():
                    serializer.save()
                    return Response({'like': serializer.data})
                    
                return Response({'Like': serializer.errors})
            else:
                return Response({'like': 'You already liked this post'})
        except:
            return Response({'error': 'There was an error! please ty again.'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class DeslikeView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        try:
            user = self.request.user
            data = self.request.data

            data['liker'] = user.id

            obj = LikeModel.objects.filter(liker=data['liker'], post=data['post']).delete()
            return Response({'deslike': 'You desliked this post'})
        except:
            return Response({'error': 'There was an error! please ty again.'})

