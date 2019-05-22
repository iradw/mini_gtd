// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  let month_s = event.month < 10 ? '0' + event.month : event.month
  let day_s = event.day < 10 ? '0' + event.day : event.day
  let date_re = event.year + '-' + month_s + '-' + day_s
  //console.log(date_re)
  let carlendarTasks = []
  let car = []

  let openid = event.userInfo.openId	//用户openid

  calendarTasks = await queryTasks(openid, 'calendar_list', event.taskId,event.remark_input,event.task_input)
  car = await filter_calendar(date_re, calendarTasks)
  //console.log(car)
  return await car
}
async function queryTasks(openid, collectionName, taskId,remark,task) {
  let c_tasks = []
  let collection = db.collection(collectionName)
  let doc = await getDoc(openid, collection)
  let queryTasks = await doc.field({
    'tasks': true
  }).get()
  let tasks = queryTasks.data.tasks
  console.log(tasks)
  for (let i in tasks) {
    if (tasks[i].taskId !== taskId) {//更改
      c_tasks.push(tasks[i])
    }else{
      let task_ch=tasks[i]
      task_ch.remark=remark
      task_ch.task=task
      c_tasks.push(task_ch)
    }
  }
  console.log(c_tasks)
  return await doc.update({
    data: {
      tasks: c_tasks
    },
  })

}
async function getDoc(openid, collection) {
  let queryId = await collection.where({
    openid
  }).field({
    '_id': true,
  }).get()
  id = queryId.data[0]._id	//获取数据id
  let doc = await collection.doc(id)
  return doc

}
async function filter_calendar(date_str, tasks) {
  let newTasks = []
  let task_c = []
  let str1 = 'task_c.isTaskModify'
  let str2 = 'task_c.isRemarkModify'			//备注是否处于修改状态
  for (let i in tasks) {
    if (tasks[i].date == date_str) {
      task_c = tasks[i]
      task_c.isTaskModify = false
      task_c.isRemarkModify = false
    }

    newTasks.push(task_c)

  }

  return newTasks
}

