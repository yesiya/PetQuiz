# models.py
from django.db import models
 
class QuizBank(models.Model):
    question = models.CharField(max_length=500, null=False)
    option1 = models.CharField(max_length=100,  null=False)
    option2 = models.CharField(max_length=100, null=False)
