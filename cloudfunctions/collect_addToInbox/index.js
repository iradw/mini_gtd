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
		//console.log(queryTasks.data.tasks)	//inbox中的tasks数组
		let tasks = queryTasks.data.tasks		//inbox中的tasks数组
		Array.from(tasks)
		let newTask = {task: '', taskId: ''}	//新事件
		newTask['task'] = event.task
		newTask['taskId'] = event.taskId
		await tasks.push(newTask)				//更新task数组	小心异步操作
		//console.log(tasks)
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