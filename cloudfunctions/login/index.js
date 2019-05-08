// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()
const db = cloud.database()
const userId = db.collection('userId')
const calendar_list = db.collection('calendar_list')
const delegation_list = db.collection('delegation_list')
const next_list = db.collection('next_list')
const plan_list = db.collection('plan_list')
const reference_list = db.collection('reference_list')
const someday_list = db.collection('someday_list')
const inbox = db.collection('inbox')


/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  
  const wxContext = cloud.getWXContext()
  let openId = event.userInfo.openId

  let {registerDate, nickName} = event
  await userId.where({
    openid:openId
  }).get()
  .then(
      async res => {
        //if 新用户
      if (res.data.length === 0) {
        await initUserInfo(openId, nickName, registerDate)

        }else{
          //老用户 获取注册时间
          // console.log(res.data[0].registerDate)
          registerDate = res.data[0].registerDate
        }
      }
    )

  return {
    registerDate,
    openid: openId,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

async function initUserInfo(openid, nickName, registerDate){
  let initData = {
    openid,
    nickName,
    tasks: []
  }
  let collections = [calendar_list, delegation_list, next_list, plan_list, someday_list, inbox, reference_list]
  return await new Promise( (resolve, reject) => {
    let promises = []
    promises[0] = userId.add({
        data: {
          openid,
          nickName,
          registerDate,
        }
      })
    
    collections.forEach( (collection, index) => {
      promises[index+1] = collection.add({
        data: initData
      })
    })
    console.log(promises)
    Promise.all(promises).then(
      (res) =>{
        resolve()
      },
      (err) => {
        reject(err)
      }
    )
  })
  
  
}
