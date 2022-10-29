// pages/shouquan/shouquan.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  shouquan:function(e)
  {
    
    //判断是否授权成功
    if (e.detail.errMsg =="getUserInfo:ok")
    {
      console.log(e);
      //如果成功，则发送AJAX请求，更新数据库
      wx.request({
        url: `${app.globalData.urls}/api/index/saveuserinfo`,
        data: {
          id:app.globalData.userid,
          nickName:e.detail.userInfo.nickName,
          headImg: e.detail.userInfo.avatarUrl,
          sex: e.detail.userInfo.gender,
          country: e.detail.userInfo.country,
          province: e.detail.userInfo.province,
          city: e.detail.userInfo.city
        },
        header: { "content-type": "application/json" },
        method: "POST",
        success:res=>{
          app.globalData.userInfo=e.detail.userInfo;
          app.globalData.userInfo.headImg=e.detail.userInfo.avatarUrl;
          console.log(app.globalData);
          wx.navigateBack({
            delta:-1
          })
        }
      })
    }
    else
    {
      //提示授权失败
      wx.showToast({
        title: '授权失败',
        icon:"none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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