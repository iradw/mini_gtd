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


/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  //console.log(event)
  //console.log(context)

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()
  let openId = event.userInfo.openId
  let allId = await userId.where({openid:openId}).get()
	.then(
		(res) => {
			console.log(res)
			if(res.data.length === 0){
				console.log('没有这个用户')
			} else{
				console.log('该用户已存在')
			}
		},
		(err) => {
			console.log(err)
		}
	)
  // if (Object.keys(allId).length==0){
    // userId.add({
    //   data: {
    //     openId: openId,
    //   }
    // }).then(res => {
    //   console.log(res)
    // })

    // calendar_list.add({
    //   data: {
    //     openId: openId,
    //     tasks: [{}]
    //   }
    // }).then(res => {
    //   console.log(res)
    // })

    // delegation_list.add({
    //   data: {
    //     openId: openId,
    //     tasks: [{}]
    //   }
    // }).then(res => {
    //   console.log(res)
    // })

    // next_list.add({
    //   data: {
    //     openId: openId,
    //     tasks: [{}]
    //   }
    // }).then(res => {
    //   console.log(res)
    // })

    // plan_list.add({
    //   data: {
    //     openId: openId,
    //     tasks: [{}]
    //   }
    // }).then(res => {
    //   console.log(res)
    // })

    // reference_list.add({
    //   data: {
    //     openId: openId,
    //     tasks: [{}]
    //   }
    // }).then(res => {
    //   console.log(res)
    // })

    // someday_list.add({
    //   data: {
    //     openId: openId,
    //     tasks: [{}]
    //   }
    // }).then(res => {
    //   console.log(res)
    // })
  //}

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
