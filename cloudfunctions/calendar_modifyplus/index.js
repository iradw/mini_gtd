// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const calendar_list = db.collection('calendar_list')

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	let openid = event.userInfo.openId	//用户openid
	// console.log(event)
	let {day, month, year, remark_input, task_input, taskId} = event
	day = format(day)
	month = format(month)
	let date = year + '-' + month + '-' + day	//这个date暂时没用 先留着以后可能有用
	let calendarTasks = await queryTasks(openid, 'calendar_list')
	let newCalendarTasks = calendarTasks
	for(let i in calendarTasks){
		if(calendarTasks[i].taskId === taskId){
			newCalendarTasks[i].task = task_input
			newCalendarTasks[i].remark = remark_input
			break;
		}
	}
	let doc = await getDoc(openid, calendar_list)
	let result = ''
	await doc.update({
		data: {
			tasks: newCalendarTasks
		}
		
	}).then(
		() => {
			result = 'success'
		},
		(err) => {
			result = 'fail'
			console.log(err)
		}
	)
	return result


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
function format(value){
	return value < 10 ? '0'+value : value
}