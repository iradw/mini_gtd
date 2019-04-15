//index.js
// import regeneratorRuntime from ('../../lib/regenerator-runtime/runtime')
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    showLogin: false
  },
  otherData: {
    openid: ''
  },
 onLogin(){
    this.onGetOpenid()
    wx.switchTab({
      url: '/pages/arrange/arrange'
    })
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                showLogin: true
              })
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
        userInfo: e.detail.userInfo,
        showLogin: true
      })
    }
  },

  onGetOpenid: function() {

    // 调用云函数
     wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        //console.log('[云函数] [login] user openid: ', res.result.openid)
        let openid =  res.result.openid
        this.otherData = openid
        app.globalData.openid = openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  }

})
