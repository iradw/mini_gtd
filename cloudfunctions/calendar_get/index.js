// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database()
const inbox=db.collection('inbox')



// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event);
  var date_tem=
  db.collection('').where({
    openid: this.data.openid,
    

  }).get().then(
    res => {
      console.log(res);
      this.setData({
        tasks_list: res.data
      })
      console.log('[数据库] [查询记录] 成功: ', res)
    },
      err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
  )
  return {
    tasks,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}