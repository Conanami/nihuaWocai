// pages/share/share.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workid:0,
    imgurl:"",
    p_name:""
  },

  // 保存到画册
  download:function()
  {
    wx.showLoading({
      title: '下载中',
    });
    //下载操作
    wx.downloadFile({
      url: app.globalData.urls+"/api/index/getshareimg?id="+this.data.workid,
      header: {},
      success:res=>{
        //下载完成先隐藏图标
        wx.hideLoading();
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success:res=>{
            console.log(res);
          }
        })
        //console.log(res);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取作品ID
    let _id=options.id;
    //设置数据
    this.setData({
      workid:_id
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
    wx.request({
      url: `${app.globalData.urls}/api/index/getworks?id=${this.data.workid}`,
      header: { "content-type": "application/json" },
      method: "POST",
      success:res=>{
        //console.log(res);
        this.setData({
          p_name:res.data.name,
          imgurl:app.globalData.urls+"/upload/works/"+res.data.img
        })
      }
    })
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
    return {
      //分享的标题
      title:'猜猜我画的是什么',
      //分享的地址
      path:'/pages/work/work?id='+this.data.workid,
      //分享的图片
      imageUrl:this.data.imgurl
    }
  }
})