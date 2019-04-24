// miniprogram/pages/review/review.js
const moment = require('../../lib/moment.min.js')
moment.locale('zh-cn')
const utils = require('../../utils/utils')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		dateList: []
	},

	calculateDate(startDate, endDate){
		let startMoment = moment(startDate, "YYYY-MM-DD")
		let endMoment = moment(endDate, "YYYY-MM-DD")
		let weeksDiff = endMoment.diff(startMoment, "weeks")//相隔周数
		let endDateWeek = endMoment.get('weekday')
		let dateList = []
		for(let i = 0; i <= weeksDiff+1; i++){
			let Sun = null
			let Mon = null
			let dateItem = {}
			if(i === 0){
				Sun = endDate									//今天
				Mon = endMoment.weekday(1).format("YYYY-MM-DD")//周一的日期
			}else{
				Sun = endMoment.weekday(0).format("YYYY-MM-DD")	//上周日的日期
				Mon = endMoment.weekday(-6).format("YYYY-MM-DD")//上周一的日期
			}
			dateItem['head'] = Mon
			dateItem['tail'] = Sun
			dateList.push(dateItem)
		}
		if(endDateWeek === 0){	//if今天周日
			dateList.splice(0, 1)
		}
		dateList[0].title = '本周'
		dateList[1].title = '上周'
		this.setData({
			dateList
		})
		//console.log(dateList)
	},
	onClickItem(event){
		let itemIndex = event.target.dataset.index
		// console.log(this.data.dateList[itemIndex])
		// let head = this.data.dateList[itemIndex]
		let {head, tail} = this.data.dateList[itemIndex]
		wx.navigateTo({
			url: `./week_review/week_review?head=${head}&tail=${tail}`
		  })
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.calculateDate("2019-01-1", utils.formatNow())	//utils.formatNow()
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})