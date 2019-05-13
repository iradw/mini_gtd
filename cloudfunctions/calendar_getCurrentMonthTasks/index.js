// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const moment = require('moment')
// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	let {year, month} = event
	if(month < 10){
		month = '0' + month
	}
	let tempDate = year + '-' + month + '-01'
	console.log(tempDate)
	let openid = event.userInfo.openId	//用户openid
	let tasksFromDB = await queryTasks(openid, 'calendar_list')
	let resultSet = new Set()
	for(let i in tasksFromDB){
		let taskDateM = moment(tasksFromDB[i].date, 'YYYY-MM-DD')
		if(taskDateM.isSame(tempDate, 'year') && taskDateM.isSame(tempDate, 'month')){
			let day = taskDateM.get('date')
			resultSet.add(day)
		}
	}
	// console.log(resultSet)
	let resultArray = [...resultSet]
	console.log(resultArray)
	return resultArray
	
}

async function queryTasks(openid, collectionName){
	let collection = db.collection(collectionName)
	let doc = await getDoc(openid, collection)
	let queryTasks = await doc.field({
		'tasks': true
	}).get()
	let tasks = queryTasks.data.tasks
	// console.log(tasks)
	return tasks
}

async function getDoc(openid, collection){
	let queryId = await collection.where({openid}).field({'_id': true}).get()
	id = queryId.data[0]._id	//获取数据id
	let doc = await collection.doc(id)
	return doc
}