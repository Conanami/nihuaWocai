// pages/plaza/plaza.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 顶部菜单
    menu:[
      "推荐","热门","最新"
    ],
    currentMenu:0,
    currentPage:1,
    workData:{},
    webUrl:app.globalData.urls,
    isBottom:false
  },
  more:function()
  {
    this.setData({
      currentPage:this.data.currentPage+1
    })
    //加载动画
    wx.showLoading({
      title: '加载中',
    })
    //获取加载更多数据
    wx.request({
      url: `${app.globalData.urls}/api/guangchang/index?type=${this.data.currentMenu}&page=${this.data.currentPage}`,
      success: res => {
        if(res.data.length<6)
        {
          this.setData({
            workData: this.data.workData.concat(res.data),
            isBottom: true
          })
        }
        else
        {
          this.setData({
            workData: this.data.workData.concat(res.data)
          })
        }
        wx.hideLoading();
      }
    })

  },
  changemenu:function(e)
  {
    //console.log(e);
    let id=e.target.id;
    //改变默认的ID
    this.setData({
      currentMenu:id,
    })
    this.getworks();

  },

  getworks:function()
  {
    //换页或者重新加载的时候，页面自动刷为1
    this.setData({
      currentPage:1,
      isBottom:false
    })
    //加载动画
    wx.showLoading({
      title: '加载中',
    })
    //获取第一页数据
    wx.request({
      url: `${app.globalData.urls}/api/guangchang/index?type=${this.data.currentMenu}`,
      success:res=>{
        this.setData({
          workData:res.data
        })
        wx.hideLoading();
      }
    })
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
    this.getworks();
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
    // this.setData({
    //   currentPage: this.data.currentPage + 1
    // })
    // this.getworks();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})