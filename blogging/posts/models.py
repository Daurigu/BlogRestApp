from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PostsModel(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)
    time = models.TimeField(auto_now=True)
    edit_time = models.TimeField(auto_now=True)
    title = models.CharField(max_length=255, default='')
    content = models.TextField(max_length=5000, default='')
    image = models.CharField(max_length=600, default='')

    def __str__(self):
        return str(self.title)