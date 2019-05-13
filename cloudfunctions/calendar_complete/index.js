// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	let openid = event.userInfo.openId	//用户openid
	let taskId = event.taskId
	//console.log(taskId)
	let tasksFromDB = await queryTasks(openid, 'calendar_list')
	let newTasks = tasksFromDB
	tasksFromDB.forEach((task, index) => {
		if(task.taskId == taskId){
			//console.log(task.isFinish)
			task.isFinish = !task.isFinish
			newTasks[index] = task
		}
	})
	//console.log(newTasks)
	let doc = await getDoc(openid, db.collection('calendar_list'))
	await doc.update({
		data: {
			tasks: newTasks
		}
	})
	return 
}
async function queryTasks(openid, collectionName){
	let collection = db.collection(collectionName)
	let doc = await getDoc(openid, collection)
	let queryTasks = await doc.field({
		'tasks': true
	}).get()
	let tasks = queryTasks.data.tasks
	return tasks
}

async function getDoc(openid, collection){
	let queryId = await collection.where({openid}).field({'_id': true}).get()
	id = queryId.data[0]._id	//获取数据id
	let doc = await collection.doc(id)
	return doc
}