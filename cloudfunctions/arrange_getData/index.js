// 云函数入口文件
/*
	通用方法
*/
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const calendar_list = db.collection('calendar_list')
const delegation_list = db.collection('delegation_list')
const next_list = db.collection('next_list')
const plan_list = db.collection('plan_list')
const reference_list = db.collection('reference_list')
const someday_list = db.collection('someday_list')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = event.userInfo.openId	//用户openid
  console.log(openid)
  let calendarresult = null	//返回给客户端的结果
  let delegationresult = null
  let nextresult = null
  let planresult = null
  let referenceresult = null
  let somedayresult = null
  try {
    calendarresult = await calendar_list.where({ openid:openid }).field({tasks:true}).get()
    delegationresult = await delegation_list.where({ openid: openid }).field({ tasks: true }).get()
    nextresult = await next_list.where({ openid: openid }).field({ tasks: true }).get()
    planresult = await plan_list.where({ openid: openid }).field({ tasks: true }).get()
    referenceresult = await reference_list.where({ openid: openid }).field({ tasks: true }).get()
    somedayresult = await someday_list.where({ openid: openid }).field({ tasks: true }).get()
    console.log(calendarresult)
    let result={}
    result.calendar_list=calendarresult
    result.delegation_list=delegationresult
    result.plan_list=planresult
    result.next_list=nextresult
    result.reference_list=referenceresult
    result.someday_list=somedayresult
    console.log(result)
    return await result
  } catch (error) {
    console.log(error)
    calendarresult = await error	//返回给客户端的结果
    delegationresult = await error
    nextresult = await error
    planresult = await error
    referenceresult = await error
    somedayresult = await error
  }
  
}