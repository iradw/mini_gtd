// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const inbox = db.collection('inbox')

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	let openid = event.userInfo.openId	//用户openid
	let result = 'success'
	let id = ''

	try {
		let queryId = await inbox.where({openid}).field({'_id': true}).get()
		id = queryId.data[0]._id	//获取数据id
		let doc = await inbox.doc(id)
		let queryTasks = await doc.field({
			'tasks': true
		}).get()
		let tasks = queryTasks.data.tasks		//inbox中的tasks数组
		Array.from(tasks)
		let deleteTaskIndex = event.deleteTaskIndex
		//console.log(deleteTaskIndex)
		await tasks.splice(deleteTaskIndex, 1)
		await doc.update({						//更新数据库
			data: {
				tasks
			}
		})
	} catch (error) {
		result = 'fail'
		console.log(error)
	}

	return result
}