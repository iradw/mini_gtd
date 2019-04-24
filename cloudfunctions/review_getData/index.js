// 云函数入口文件
const moment = require('moment')
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	let openid = event.userInfo.openId	//用户openid
	let {head, tail} = event.date		//查询的日期 某个周一~周日
	let headMoment = moment(head, "YYYY-MM-DD").subtract(1,'days')
	let tailMoment = moment(tail, "YYYY-MM-DD").add(1, 'days')
	//console.log(headMoment)
	//console.group(tailMoment)
	let calendarTasks = []				//日程表
	let planTasks = []					//计划
	let nextTasks = []					//下一步
	let delegationTasks = []			//委托
	let result = {}
	//console.log(head, tail)
	//console.log(headMoment)	moment("2019-04-08T00:00:00.000")
	//查询4个集合 将需要的信息分别放到上面四个数组中
	calendarTasks = await queryTasks(openid, 'calendar_list')
	// console.log(calendarTasks)      以成功获取
	calendarTasks = await filterTasks(calendarTasks, headMoment, tailMoment)
	planTasks = await queryTasks(openid, 'plan_list')
	planTasks = await filterTasks(planTasks, headMoment, tailMoment)

	nextTasks = await queryTasks(openid, 'next_list')
	nextTasks = await filterTasks(nextTasks, headMoment, tailMoment)
	//console.log(nextTasks)

	delegationTasks = await queryTasks(openid, 'delegation_list')
	delegationTasks = await filterTasks(delegationTasks, headMoment, tailMoment)
	result = await {calendarTasks, planTasks, nextTasks, delegationTasks}
	return await result
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
async function filterTasks(tasks, headMoment, tailMoment){
	let newTasks = []
	for(let i in tasks){
		console.log(tasks[i].addDate)	//每件事的addDate
		let between = await moment(tasks[i].addDate, "YYYY-MM-DD").isBetween(headMoment, tailMoment)
		if(between){	//如果添加日期在选择的日期之间
			newTasks.push(tasks[i])
		}
	}
	return newTasks

}