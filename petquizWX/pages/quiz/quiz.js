// pages/quiz/quiz.js
var app = getApp();//获取当前小程序实例，方便使用全局方法和属性
var curNum = 1, curAnswer = "";
Page({

  //1、页面数据部分
  data: { question: "", options: "" },//设置页面数据，后面空值将在页面显示时通过请求服务器获取

  //2、系统事件部分
  onShow: function () {
    this.showQuestion();
  },
  
  showQuestion: function () {
    var that = this;
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 })//设置加载模态框
    that.getQuiz1(function (d) {
      wx.hideToast();

      var opts = [];
      for (let i = 0; i < d.options.length; ++i) {
        opts.push({ value: d.options[i] });
      }

      that.setData({ question: d.question, options: opts, curNum: d.ID})
    });
  },
  


  //3、接口方法：
  //获取当前问题  maybe use POST also
  getQuiz1: function (fn) {
    wx.request({//请求服务器，类似ajax
      url: 'http://192.168.0.105:8000/loginSec',
      data: {},
      header: { 'Content-Type': 'application/json' },
      success: function (res) { fn(res.data); }//成功后将数据传给回调函数执行
    })
  },

  //选取结果
  getQuiz: function (num, fn) {
    var that = this;
    wx.request({//请求服务器，类似ajax
      url: 'http://192.168.0.105:8000/getQuiz',
      method: 'POST',
      data: {
        questionNum: that.data.curNum
      },
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) { fn(res.data); }//成功后将数据传给回调函数执行
    })
  },

  sendAnswer: function (fn) {
    var that = this;
    wx.request({//请求服务器，类似ajax
      url: 'http://192.168.0.105:8000/getResult',
      method: 'POST',
      data: {
        questionNum: this.data.curNum,
        answer: this.data.curAnswer
      },
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        // console.log(res.data.nextQuestionNum);
        if (true == res.data.rightAnswer) {
          that.data.curNum = res.data.nextQuestionNum;
          console.log(that.data.curNum);
          wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 })//设置加载模态框
          that.getQuiz(that.data.curNum, function (d) {
            wx.hideToast();

            var opts = [];
            for (let i = 0; i < d.options.length; ++i) {
              opts.push({ value: d.options[i] });
            }

            that.setData({ question: d.question, options: opts })
          });
        }

        if (res.data.ret == 200) {
          console.log("true!!!!!");
          //something to do
        }
        else {
          console.log("false!!!!!");
          //something to do
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.data.curNum = "1";
    this.data.curAnswer = e.detail.value;
    this.sendAnswer();
  },

  // /**
  //  * 页面的初始数据
  //  */
  // data: {

  // },

  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  // onLoad: function (options) {

  // },

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})