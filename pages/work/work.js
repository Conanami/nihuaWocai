// pages/work/work.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //下载地址
    webUrl: app.globalData.urls,
    //作品编号
    workid:0,
    //作品信息
    workdata:{},
    //题目信息
    projectdata:{},
    //用户信息
    userdata:{},
    // 是否可以查看答案
    isLook:false,
    inputanswer:"",
    answerlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      workid:options.id
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //1，得到作品
    wx.request({
      url: this.data.webUrl+"/api/guangchang/works?id="+this.data.workid,
      success:res=>{
        this.setData({
          workdata:res.data.workData,
          projectdata:res.data.projectData,
          userdata:res.data.userData
        })
        wx.setNavigationBarTitle({
          title: this.data.userdata.nickName+" 的作品",
        })
      }
    })
    //2，得到是否可以查看答案
    wx.request({
      url: this.data.webUrl + "/api/guangchang/checklook",
      data:{
        uid:app.globalData.userid,
        workid:this.data.workid,
      },
      success:res=>{
        this.setData({
          isLook: res.data==1?true:false
        })
      }

    })
    //3，得到回答问题的列表
    wx.request({
      url: this.data.webUrl+"/api/guangchang/answerlist?workid="+this.data.workid,
      success:res=>{
        this.setData({
          answerlist:res.data
        })
      }
    })
  },

  shuru:function(e)
  {
    this.setData({
      inputanswer:e.detail.value
    })
  },

  answer:function()
  {
    //判断该用户是否有头像和nickName
    if (app.globalData.userInfo.headImg && app.globalData.userInfo.nickName)
    {
      //判断回答是否为空
      if (this.data.inputanswer)
      {
        wx.request({
          url: this.data.webUrl+'/api/guangchang/answer',
          data:{
            user_id:app.globalData.userid,
            work_id:this.data.workid,
            text:this.data.inputanswer,
          },
          method:"post",
          success:res=>{
            if(res.data.code=="200")
            {
              this.setData({
                isLook: true
              })
              wx.showToast({
                title: res.data.info,
              })
            } 
            else
            {
              wx.showToast({
                title: res.data.info,
                icon:"none"
              })
            }
                       
          }
        })
      }else
      {
        wx.showToast({
          title: '答案不能为空',
          icon:"none"
        })
      }
    }
    else
    {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})