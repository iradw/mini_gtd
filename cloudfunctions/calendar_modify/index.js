// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  let date_re = event.year + '-' + event.month + '-' + event.day
  
  let carlendarTasks = []
  let car = []

  let openid = event.userInfo.openId	//用户openid

  calendarTasks = await queryTasks(openid, 'calendar_list',event.tasks)
  console.log(calendarTasks)
  car = await filter_calendar(date_re, calendarTasks)
  
  return await car
}
async function queryTasks(openid, collectionName,tasks_p) {
  let c_tasks = []
  let collection = db.collection(collectionName)
  let doc = await getDoc(openid, collection)
  let queryTasks = await doc.field({
    'tasks': true
  }).get()
  let tasks = queryTasks.data.tasks
  console.log(tasks)
  for (let i in tasks) {
    if (tasks[i].remark !== tasks_p[i].remark) {
      let task_ch = tasks[i]

      task_ch.remark = tasks_p[i].remark

      
      if (tasks[i].task !== tasks_p[i].task){
        task_ch.task=tasks_p[i].task
        c_tasks.push(task_ch)
      }else{
        c_tasks.push(task_ch)
      }
    }else{
      if (tasks[i].task !== tasks_p[i].task){
          let task_cj=tasks[i]
          task_cj.task=tasks_p[i].task
          c_tasks.push(task_ch)
      }else{
      c_tasks.push(tasks[i])
      }

    }
  }


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