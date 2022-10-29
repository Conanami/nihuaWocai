//获取应用对象
let app=getApp();
//引入公共函数才能使用
let common = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUrl:app.globalData.urls,
    slider:[]
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
    var _url=`${app.globalData.urls}/api/index/index`;
    var _data={};
    let that = this;
    //AJAX请求

    common.http_request(_url,
      //使用函数处理回来的数据
      function(res){
        //console.log(res.data);
        //设置数据
        that.setData({
          slider:res.data
        })
      },
      _data);

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