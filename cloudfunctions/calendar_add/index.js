// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  let date_re = event.year + '-' + event.month + '-' + event.day
  console.log(date_re+'knkn')
  let carlendarTasks = []             //这里名字错了
  let car = []
  let openid = event.userInfo.openId	//用户openid
  calendarTasks = await queryTasks(openid, 'calendar_list',date_re)
  car = await filter_calendar(date_re, calendarTasks)
  
  return await car
}
async function queryTasks(openid, collectionName,date_str) {
  let collection = db.collection(collectionName)
  let doc = await getDoc(openid, collection,date_str)
  let queryTasks = await doc.field({
    'tasks': true
  }).get()
  let tasks = queryTasks.data.tasks
  return tasks
}
async function getDoc(openid, collection,date_str) {
  let queryId = await collection.where({
    openid
  }).field({
    '_id': true,
  }).get()
  id = queryId.data[0]._id	//获取数据id
  await collection.doc(id).update({
    data: {
      tasks: cloud.database().command.push([{
        task: '',
        remark: '',
        isFinsh: false,
        date: date_str,
      }])
    }
  })
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