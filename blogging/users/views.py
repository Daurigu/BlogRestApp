from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout

from users.models import UserProfileModel, UserFollowsModel
from users.serializers import UserSerializer, UserProfileSerializer, UserFollowerSerializer, EditUserProfileSerializer

# Create your views here.
@method_decorator(csrf_protect, name='dispatch')
class RegisterView(APIView):

    def post(self, request, format=None):
        try:
            data = self.request.data

            username = data['username']
            password = data['password']
            re_password = data['re_password']

            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'Error': 'The user already existe, please try another'})
                else:
                    if len(password) < 8:
                        return Response({'Error': 'Please use a password that uses more that 8 characters'})
                    else:
                        user = User.objects.create_user(username=username, password=password)
                        user.save()

                        user = User.objects.get(username=username)
                        user_profile = UserProfileModel(username=user, name='', profile_pic='', email='', about='')
                        user_profile.save()

                        return Response({'Success': 'User Created'})
            else:
                return Response({'Error': 'Incorrect Password'})
        except:
            return Response({'Error': 'There was an error tryning to register, please try again.'})

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        try:
            username = data['username']
            password = data ['password']
            user = authenticate(request, username=username, password=password)
        except:
            return Response({'Error': 'Please Insert the key values "username" and "password" for you to login'})
        
        if user is not None:
            login(request, user)
            return Response({'Login': 'Success', 'username': username})
        else:
            return Response({'Login': 'Fail'})


@method_decorator(csrf_protect, name='dispatch')
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        try:
            logout(self.request)
            return Response({'logout': 'Success'})
        except:
            return Response({'logout': 'Fail'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetSCRFToken(APIView):
    def get(self, request, format=None):
        return Response({'CSRF':'Sent'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class authenticationVerificationView(APIView):
    def get(self, request, format=None):
        isAuth = User.is_authenticated
        if isAuth:
            return Response({'Authentication': 'Success'})
        else:
            return Response({'Authentication': 'Fail'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class DeleteUserView(APIView):
    permission_classes = (IsAuthenticated,)
    def delete(self, request, format=None):
        user = self.request.user
        try:
            data = User.objects.filter(id = user.id).delete()
            print(data)
            return Response({'Deletion': 'Success', 'info': str(data)})
        except:
            return Response({'Deletion': 'There was an error trying to delete your account. Please try again.'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetUsersView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        try:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)
        except:
            return Response({'Error': 'There was an error, please try again.'})

#----------------------
#    PROFILE
#----------------------

@method_decorator(ensure_csrf_cookie, name='dispatch')
class UpdateUserProfileView(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request, format=None):
        try:
            user = self.request.user
            user_id = User.objects.get(id=user.id)

            data = self.request.data

            name = data['name']
            profile_pic = data['profile_pic']
            email = data['email']
            about = data['about']

            UserProfileModel.objects.filter(username=user_id).update(name=name, profile_pic=profile_pic, email=email, about=about)
            
            user_profile = UserProfileModel.objects.get(username=user_id)
            serializer = EditUserProfileSerializer(user_profile)

            return Response({'user': str(user.username), 'profile': serializer.data})
        except:
            return Response({'Error': 'There was an error, please try again.'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetUserProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = self.request.user
            user_id = User.objects.get(id=user.id)

            user_profile = UserProfileModel.objects.get(username=user_id)
            serializer = UserProfileSerializer(user_profile)

            return Response({'user': str(user.username), 'profile': serializer.data})
        except:
            return Response({'Error': 'There was an error, please try again.'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetOtherUserProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, format=None):
        try:
            user_id = User.objects.get(username=pk)

            user_profile = UserProfileModel.objects.get(username=user_id)
            serializer = UserProfileSerializer(user_profile)

            return Response({'user': pk, 'profile': serializer.data})
        except:
            return Response({'user': 'Not Found', 'profile': {'name': 'Not Found','profile_pic': '', 'email': '','about': ''}})

#----------------------
#    FOLLOW
#----------------------


@method_decorator(ensure_csrf_cookie, name='dispatch')
class FollowView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data
        try:
            follow = data['follow']
            follow = User.objects.get(username=follow)

            exist = UserFollowsModel.objects.filter(user_id=user, following_user_id=follow)

            if not exist:
                followObject = UserFollowsModel(user_id=user, following_user_id=follow)
                followObject.save()
            else:
                return Response({'error': 'You already follow that user'})

            
            return Response({'user': str(user.username), 'following': str(follow)})

        except:
            return Response({'Error': 'There was an error! Please try again.'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class UnfollowView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        try:
            user = self.request.user
            data = self.request.data

            follow = data['unfollow']
            follow = User.objects.get(username=follow)

            UserFollowsModel.objects.get(user_id=user, following_user_id=follow).delete()
            
            return Response({'user': str(user.username), 'following': str(follow) + ' unfollowed'})
        except:
            return Response({'Error': 'There was an error! Please try again.'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetFollowingView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        user = self.request.user
        
        try:
            user_profile = User.objects.get(id=user.id)
            following = user_profile.following.all().values()
            newData= []
            
            for i in following:
                user_id = User.objects.get(id=int(i['following_user_id_id']))
                profile = UserProfileModel.objects.get(username=user_id)
                serializer = UserProfileSerializer(profile)
                newData.append(serializer.data)

            return Response({'user': str(user.username), 'following': newData})
        except:
            return Response({'Error': 'There was an error, please try again.'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetFollowerView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        user = self.request.user
        try:
            user_profile = User.objects.get(id=user.id)
            following = user_profile.followers.all().values()
            newData= []
            
            for i in following:
                user_id = User.objects.get(id=int(i['user_id_id']))
                profile = UserProfileModel.objects.get(username=user_id)
                serializer = UserProfileSerializer(profile)
                newData.append(serializer.data)

            return Response({'user': str(user.username), 'follower': newData})
        except:
            return Response({'Error': 'There was an error, please try again.'})


''' 
-----------------------
------ Others Followers
-----------------------
''' 

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetOthersFollowingView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, format=None):
                
        try:
            user_profile = User.objects.get(username=pk)
            following = user_profile.following.all().values()
            newData= []
            
            for i in following:
                user_id = User.objects.get(id=int(i['following_user_id_id']))
                profile = UserProfileModel.objects.get(username=user_id)
                serializer = UserProfileSerializer(profile)
                newData.append(serializer.data)

            return Response({'user': pk, 'following': newData})
        except:
            return Response({'Error': 'There was an error, please try again.'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetOthersFollowerView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, format=None):
        try:
            user_profile = User.objects.get(username=pk)
            following = user_profile.followers.all().values()
            newData= []
            
            for i in following:
                user_id = User.objects.get(id=int(i['user_id_id']))
                profile = UserProfileModel.objects.get(username=user_id)
                serializer = UserProfileSerializer(profile)
                newData.append(serializer.data)

            return Response({'user': pk, 'follower': newData})
        except:
            return Response({'Error': 'There was an error, please try again.'})