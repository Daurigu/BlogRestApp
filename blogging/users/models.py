from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfileModel(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default='')
    profile_pic = models.CharField(max_length=255, default='')
    email = models.CharField(max_length=255, default='')
    about = models.CharField(max_length=600, default='')

    def __str__(self):
        return str(self.username)

class UserFollowsModel(models.Model):
    user_id = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    following_user_id = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)

