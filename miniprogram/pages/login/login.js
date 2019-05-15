//index.js
// import regeneratorRuntime from ('../../lib/regenerator-runtime/runtime')
const app = getApp()
import moment from '../../lib/moment.min.js'

Page({
  data: {
    logged: false,
    takeSession: false,
    requestResult: ''
  },
 onLogin(){
    this.onGetOpenid()
    wx.switchTab({
      url: '/pages/arrange/arrange'
    })
  },

  onLoad: function() {
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.avatarUrl = res.userInfo.avatarUrl
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo
              })
              // console.log(res)
              this.onLogin()
              app.globalData.regular = true
            }
          })
        }
      }
    })

		
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
      app.globalData.userInfo = e.detail.userInfo
      this.onLogin()
    }
  },

  onGetOpenid: function() {

    // 调用云函数
     wx.cloud.callFunction({
      name: 'login',
      data: {
        registerDate: moment().format('YYYY-MM-DD'),
        nickName: this.data.userInfo.nickName
      },
      success: res => {
        //console.log('[云函数] [login] user openid: ', res.result.openid)
        let {openid, registerDate, regular} =  res.result
        app.globalData.openid = openid
        app.globalData.regular = regular
        //console.log(registerDate)
        app.globalData.registerDate = registerDate
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  }

})
