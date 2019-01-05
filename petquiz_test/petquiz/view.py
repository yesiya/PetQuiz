
#coding=utf-8
from django.shortcuts import render
from django.http import HttpResponse
import json


def index(request):
    return render(request, 'index.html', {'hello': 'hello world'})


# def hello(request):
#     quiz = { "question" : "二哈代表以下哪种狗狗狗狗狗狗狗狗狗狗狗狗狗狗狗狗?", "options" : ["哈士奇", "泰迪"]}
#     return HttpResponse(json.dumps(quiz))



def loginSec(request):
    print(request)
    quiz = { "question" : "二哈代表以下哪种狗狗狗狗狗狗狗狗狗狗狗狗狗狗狗狗狗狗狗狗？", "options" : ["哈士奇", "泰迪"]}
    return HttpResponse(json.dumps(quiz))

def question2(request):
    quiz = { "question" : "狗狗能吃巧克力吗？", "options" : ["不能", "能"]}
    return HttpResponse(json.dumps(quiz))


def getResult(request):
    print(request)
    if request.method=='POST':
        questionNum = request.POST.get("questionNum")
        answer = request.POST.get("answer")
        print(answer)
        if ("1" == questionNum) and ("哈士奇" == answer):
            return HttpResponse(True)
        else:
            return HttpResponse(False)

    return HttpResponse(False)






from django.http import HttpResponse
 
from petquiz.model import QuizBank
 
# 数据库操作
def testdb(request):
    test1 = QuizBank(question='insert a question!')
    # test1 = QuizBank.objects.all()
    print (test1)
    # test1.save()
    return HttpResponse("<p>数据添加成功！</p>")