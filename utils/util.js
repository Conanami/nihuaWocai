const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//这是个自己封装的发送AJAX函数的函数
// callback是回调方法
// 通过回调方法把返回值给出去
function http_request(url,callback,data,method="GET")
{
  //发送AJAX请求，获得BANNER图
  wx.request({
    //请求地址
    url: url,
    //请求方式
    method: method,
    //请求头
    header: {
      "content-type": "application/json"
    },
    //请求数据
    data: data,
    //请求成功
    success: function (res) {
      callback(res);
    },


  })
}
module.exports = {
  formatTime: formatTime,
  http_request:http_request
}
