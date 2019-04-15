// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	let openid = event.userInfo.openId	//用户openid
	let result = 'success'
	try {
		await db.collection('inbox').add({
			data: {
				
			}

		})
	} catch (error) {
		result = error
	}
	return result
	
}