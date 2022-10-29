App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    //完成用户登录
    //1,login 获取用户临时凭证
    wx.login({
      success:res=>{
        
        let code = res.code;
        //2，通过临时凭证获取用户open ID
        wx.request({
          url: `${this.globalData.urls}/api/index/getopenid?code=${code}`,
          success:res=>{
            let openid=res.data.openid;
            let session_key=res.data.session_key;
            //保存为全局变量，整个APP里面都可以用
            this.globalData.openid=openid;
            this.globalData.session_key=session_key;
            //console.log(session_key);
            //3,判断用户是否注册了小程序
            //如果没有，则帮他注册
            //如果已经注册，则返回用户信息
            wx.request({
              url: `${this.globalData.urls}/api/index/getuserinfo?openid=${openid}`,
              success:res=>{
                let user=res.data;
                console.log(user.id);
                this.globalData.userid=user.id;
                this.globalData.userInfo=user;
              }             
            })
          }
        })
        

      }
    })
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  // 应用的公共数据
  globalData:{
    urls:"https://nicaiwohua.xuanxuannet.com/"
  }
})
