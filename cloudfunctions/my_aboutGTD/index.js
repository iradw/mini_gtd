// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const articles = db.collection('articles')
const gtdDoc = articles.doc('d740b9a2-a3d7-40ed-8614-6764aed6b1bb')

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	let queryResult = await gtdDoc.get()
	console.log(queryResult.data)
	return queryResult.data
	
}