from django.shortcuts import render

# Create your views here.

from . import models
from django.http import HttpResponse
import json

def index(request):
    question = models.QuizBank.objects.get(pk=1)
    return render(request, 'index.html', {'question': question})




def loginSec(request):
    question = models.QuizBank.objects.get(pk=1)
    question = { "ID":question.id, "question" : question.question, "options" : [question.option1, question.option2]}
    return HttpResponse(json.dumps(question))


def getQuiz(request):
    if request.method=='POST':
        question = models.QuizBank.objects.get(pk=request.POST.get('questionNum'))
        question = { "question" : question.question, "options" : [question.option1, question.option2]}
        return HttpResponse(json.dumps(question))

def getResult(request):
    if request.method=='POST':
        questionNum = request.POST.get("questionNum")
        answer = models.QuizBank.objects.get(pk=int(questionNum)).answer
        if (request.POST.get("answer") == answer):
            rightAnswer = True
            nextQuestionNum = 2
            responeData = {'rightAnswer': rightAnswer, 'nextQuestionNum': int(nextQuestionNum)}
            return HttpResponse(json.dumps(responeData))
        else:
            return HttpResponse(False)

    return HttpResponse(False)