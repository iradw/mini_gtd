// 云函数入口文件
/*
	通用方法
*/
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const inbox = db.collection('inbox')
// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	let openid = event.userInfo.openId	//用户openid
	let result = null	//返回给客户端的结果
	try {
		result = await inbox.where({openid}).field({'tasks': true}).get()
		// console.log(result.data[0]._id) //_id
	} catch (error) {
		result = await error
	}

	return await result
	
}