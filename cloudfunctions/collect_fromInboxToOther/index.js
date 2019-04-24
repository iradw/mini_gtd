// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const inbox = db.collection('inbox')

// 云函数入口函数
exports.main = async (event, context) => {
	/*
		
	*/
	const wxContext = cloud.getWXContext()
	let openid = event.userInfo.openId	//用户openid
	//let result = 'success'
	let {taskIndex} = event.prams
	//console.log(event)
	await addData(openid, event.prams)

	await deleteData(openid, taskIndex)
	return 'success'
	
}
async function deleteData(openid, taskIndex){
	try {
		let queryId = await inbox.where({openid}).field({'_id': true}).get()
		let id = ''
		console.log(queryId)
		id = queryId.data[0]._id	//获取inbox中数据id
		let doc = await inbox.doc(id)
		let queryTasks = await doc.field({
			'tasks': true
		}).get()
		let tasks = queryTasks.data.tasks		//inbox中的tasks数组
		Array.from(tasks)
		await tasks.splice(taskIndex, 1)
		await doc.update({						//更新数据库
			data: {
				tasks
			}
		})
	} catch (error) {
		console.log(error)
	}
}
async function addData(openid, prams){
	let {boxIndex, taskId, task, addDate, pickedDate, startDate, endDate, isFinish} = prams
	let newTask = {
		taskId,
		task,
		addDate
	}
	//console.log(prams)
	let doc = null
	let queryTasks = null
	let tasks = null
	switch (boxIndex) {
		
		case 0:				//日程表
			newTask.date = pickedDate
			newTask.isFinish = isFinish
			newTask.finishDate = null
			const calendar_list = db.collection('calendar_list')
			doc = await getDoc(openid, calendar_list)
			queryTasks = await doc.field({
				'tasks': true
			}).get()
			tasks = queryTasks.data.tasks		//collection中的tasks数组
			await Array.from(tasks)
			await tasks.push(newTask)
			// console.log("新数组")
			// console.log(tasks)
			await doc.update({						//更新数据库
				data: {
					tasks
				}
			})
		break
		case 1:				//下一步
			newTask.isFinish = isFinish
			newTask.finishDate = null
			const next_list = db.collection('next_list')
			doc = await getDoc(openid, next_list)
			queryTasks = await doc.field({
				'tasks': true
			}).get()
			tasks = queryTasks.data.tasks		//collection中的tasks数组
			await Array.from(tasks)
			await tasks.push(newTask)
			// console.log("新数组")
			// console.log(tasks)
			await doc.update({						//更新数据库
				data: {
					tasks
				}
			})	
		break
		case 2:				//委托
			newTask.isFinish = isFinish
			newTask.finishDate = null
			const delegation_list = db.collection('delegation_list')
			doc = await getDoc(openid, delegation_list)
			queryTasks = await doc.field({
				'tasks': true
			}).get()
			tasks = queryTasks.data.tasks		//collection中的tasks数组
			await Array.from(tasks)
			await tasks.push(newTask)
			// console.log("新数组")
			// console.log(tasks)
			await doc.update({						//更新数据库
				data: {
					tasks
				}
			})
		break
		case 3:				//计划
			newTask.isFinish = isFinish
			newTask.finishDate = null
			newTask.startDate = startDate
			newTask.endDate = endDate
			newTask.isFinish = isFinish
			newTask.finishDate = null
			const plan_list = db.collection('plan_list')
			doc = await getDoc(openid, plan_list)
			queryTasks = await doc.field({
				'tasks': true
			}).get()
			tasks = queryTasks.data.tasks		//collection中的tasks数组
			await Array.from(tasks)
			await tasks.push(newTask)
			// console.log("新数组")
			// console.log(tasks)
			await doc.update({						//更新数据库
				data: {
					tasks
				}
			})
		break
		case 4:				//someday
			newTask.isFinish = isFinish
			newTask.finishDate = null
			newTask.isFinish = isFinish
			newTask.finishDate = null
			const someday_list = db.collection('someday_list')
			doc = await getDoc(openid, someday_list)
			queryTasks = await doc.field({
				'tasks': true
			}).get()
			tasks = queryTasks.data.tasks		//collection中的tasks数组
			await Array.from(tasks)
			await tasks.push(newTask)
			// console.log("新数组")
			// console.log(tasks)
			await doc.update({						//更新数据库
				data: {
					tasks
				}
			})
		break
		case 5:				//参考
		newTask.isFinish = isFinish
			newTask.finishDate = null
			const reference_list = db.collection('reference_list')
			doc = await getDoc(openid, reference_list)
			queryTasks = await doc.field({
				'tasks': true
			}).get()
			tasks = queryTasks.data.tasks		//collection中的tasks数组
			await Array.from(tasks)
			await tasks.push(newTask)
			// console.log("新数组")
			// console.log(tasks)
			await doc.update({						//更新数据库
				data: {
					tasks
				}
			})
		break
	}
}
async function getDoc(openid, collection){
	let queryId = await collection.where({openid}).field({'_id': true}).get()
		id = queryId.data[0]._id	//获取数据id
		let doc = await collection.doc(id)
		return doc
}