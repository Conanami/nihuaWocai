// pages/canvas/start.js
//要用的全局变量；
let app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //初始化标题
    project:{},
    //线的粗细
    linewidth:[12,21,30,40,50],
    //当前默认粗细
    currentLineWidth: 0,
    //绘图颜色
    color:['#da1c34','#8a3022','#ffc3b0','#ffa300','#66b502','#148bfd','#000','#9700c2','#8a8989','#fff'],
    //当前默认颜色
    currentColor:0,

    alerthidden:true,
    //是否开始画画
    isStart:false

  },

  //变换粗细
  changeLineWidth:function(e)
  {
    let wid=e.target.id;
    this.setData({
      currentLineWidth: wid,
    })
    //this.mycanvas.setStrokeStyle(this.data.color[colorid]);

    this.mycanvas.setLineWidth(this.data.linewidth[wid]/3);
  },

  //发布作品
  fabuWork:function(e)
  {
    
    //判断是否开始绘画
    if(this.data.isStart==true)
    {
      //判断有没有头像和昵称
      if(app.globalData.userInfo.headImg && 
        app.globalData.userInfo.nickName )
      {
        wx.showLoading({
          title: '作品发布中',
        });
        //直接发表作品
        //1,将画布中的图片保存下来
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          quality:1,
          success:res=>{
            console.log(res);
            let tmpFilePath=res.tempFilePath;
            //2，把临时文件上传
            wx.uploadFile({
              url: `${app.globalData.urls}/api/index/uploadfile`,
              filePath: tmpFilePath,
              name: 'workimg',
              // header: { "content-type":"multipart/form-data"},
              success:res=>{
                //2，正式发表作品了
                wx.request({
                  url: `${app.globalData.urls}/api/index/fabuworks`,
                  data:{
                    user_id:app.globalData.userInfo.id,
                    project_id:this.data.project.id,
                    img:res.data
                  },
                  method:"post",
                  header:{"content-type":"application/json"},
                  success:res=>{
                    wx.hideLoading();
                    if(res.data.code==200)
                    {
                      // wx.showToast({
                      //   title: '作品发布成功'
                      // })
                      //跳转到分享页面
                      //带上作品的ID
                      wx.navigateTo({
                        url: '/pages/share/share?id='+res.data.data.id,
                      })
                    }
                    else
                    {
                      wx.showToast({
                        title: '作品发布失败',
                      })
                    }
                  }
                })

              }
            });
          }
        });
      }else
      {
        //跳转授权页面
        wx.navigateTo({
          url: '/pages/shouquan/shouquan',
        })
      }
    }else{
      wx.showToast({
        title: '请开始绘画',
        icon:"none"
      })
    }
  },
  //发布题目
  fabuProject:function(e)
  {
    
    let formdata=e.detail.value;
    console.log(e);
    if(formdata.name && formdata.notice)
    {
      wx.showLoading({
        title: '提交中',
      })
    }
    else{
      wx.showToast({
        title: '请输入内容',
        icon:"none"
      
      })
      return ;
    }
    wx.request({
      url: `${app.globalData.urls}/api/index/addproject`,
      data:{
        name:formdata.name,
        notice:formdata.notice,
        uid:app.globalData.userid

      },
      header:{"content-type":"application/json"},
      method:"POST",
      success:res=>{
        wx.hideLoading();
        if(res.data.code==200)
        {
          //发表成功
          wx.showToast({
            title: res.data.info,

          })
          this.setData({
            project: res.data.data,
            alerthidden:true
          })
        }
        else
        {
          //发表失败
          wx.showToast({
            title: res.data.info,
            icon:"none"
          })
        }
      }
    })
  },
  //开始绘画
  canvasStart:function(e)
  {
    //console.log(e);
    let x=e.touches[0].x;
    let y=e.touches[0].y;
    this.mycanvas.moveTo(x,y);
  },
  //绘画进行中
  canvasMove:function(e)
  {
    let x = e.touches[0].x;
    let y = e.touches[0].y;
    this.mycanvas.lineTo(x,y);
    this.mycanvas.stroke();
    this.mycanvas.draw(true);
    this.mycanvas.moveTo(x,y);

  },
  //结束绘画
  canvasEnd:function(e)
  {
    this.setData({
      isStart:true
    })
  },
  //橡皮擦
  rubber:function()
  {
    this.mycanvas.setStrokeStyle("#fff");
    this.setData({
      currentColor:9
    })
  },  
  clearCanvas:function()
  {
    console.log('1111');
    this.mycanvas.clearRect(0,0,500,600);
    this.mycanvas.draw(true);
    this.setData({
      isStart:false
    })
  },
  //换颜色
  changeColor:function(e)
  {
    console.log(e);
    let colorid=e.target.id;
    this.setData({
      currentColor:colorid,
    })
    this.mycanvas.setStrokeStyle(this.data.color[colorid]);

    // this.mycanvas.setLineWidth("5");
  },
  //自己出题，弹出出题框
  makeProject:function()
  {
    this.setData({
      alerthidden:false
    })
  },
  // 隐藏自己出题框
  hideAlert:function()
  {
    this.setData({
      alerthidden: true
    })
  },
  //重新加载题目
  reloadProject:function()
  {
    wx.request({
      url: `${app.globalData.urls}/api/index/getproject`,
      //ES6中的语法，主要解决this的改变
      success: res => {
        this.setData({
          project: res.data
        });


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
    //随即得到一个题目
    this.reloadProject();
    //创建画板
    let data=this.data;
    this.mycanvas = wx.createCanvasContext("mycanvas", this);
    //console.log(this.mycanvas);
    this.mycanvas.setStrokeStyle(data.color[data.currentColor]);
    this.mycanvas.setLineWidth(data.linewidth[data.currentLineWidth]/3);
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