from django.db import models

# Create your models here.

class QuizBank(models.Model):
    question = models.CharField(max_length=500, null=False)
    option1 = models.CharField(max_length=100,  null=False)
    option2 = models.CharField(max_length=100, null=False)
    answer = models.CharField(max_length=2, null=False)