from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PostsModel(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now=True)
    edit_time = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255, default='')
    content = models.TextField(max_length=5000, default='')
    image = models.CharField(max_length=600, default='')

    def __str__(self):
        return str(self.title)


class CommentsModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    comment = models.TextField(max_length=400)
    time = models.TimeField(auto_now=True)

    def __str__(self):
        return str(self.user)

class LikeModel(models.Model):
    post = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    liker = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.liker)


