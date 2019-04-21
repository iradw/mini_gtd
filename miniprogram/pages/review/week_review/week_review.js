// miniprogram/pages/review/week_review/week_review.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: {
			tail: '',
			head: ''
		},
		currentPage: 1,				//当前页
		listNames: ['日程表','下一步',	'委托清单','计划'],
		currentList: 1,				//当前列表
		currentListName: '日程表',	//当前列表名
		listNameAction: 'fadeInRight',//列表名动作
		listAction: 'jackInTheBox',	//列表动作
		calendarTasks: [
			// {
			// 	task: '这是一个日程',
			// 	isFinish: false,
			// 	addDate: '2019-04-21',
			// 	date: '2019-04-27'
			// },
			// {
			// 	task: '这是一个日程',
			// 	isFinish: false,
			// 	addDate: '2019-04-21',
			// 	date: '2019-04-27'
			// },
			// {
			// 	task: '这是一个日程',
			// 	isFinish: false,
			// 	addDate: '2019-04-21',
			// 	date: '2019-04-27'
			// }
		],
		planTasks: [
			// {
			// 	task: '这是一个计划',
			// 	isFinish: false,
			// 	startDate: '2019-04-01',
			// 	endDate: '2019-04-27',
			// 	taskSteps: [
			// 		{
			// 			step: '这是步骤1',
			// 			isFinish: false
			// 		},
			// 		{
			// 			step: '这是步骤2',
			// 			isFinish: false
			// 		}
			// 	]
			// },
			// {
			// 	task: '这是一个计划',
			// 	isFinish: false,
			// 	startDate: '2019-04-01',
			// 	endDate: '2019-04-27',
			// 	taskSteps: [
			// 		{
			// 			step: '这是步骤1',
			// 			isFinish: false
			// 		},
			// 		{
			// 			step: '这是步骤2',
			// 			isFinish: false
			// 		}
			// 	]
			// }
		],
		nextTasks: [
			// {
			// 	task: '这是下一步事件',
			// 	isFinish: false,
			// 	addDate: '2019-04-21',
			// 	finishDate: ''
			// }
		],
		delegationTasks: [
			// {
			// 	task: '这是委托事件',
			// 	isFinish: false,
			// 	addDate: '2019-04-21',
			// 	finishDate: ''
			// }
		],
		
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.showLoading({
			title: '正在加载数据',
		  })
		//console.log(options.head, options.tail)
		let date = {
			head: options.head,
			tail: options.tail
		}
		//从数据库获得数据 向云函数传递head, tail 云函数返回给4个数组
		wx.cloud.callFunction({
			name: 'review_getData',
			data:{
				date
			}
		}).then(
			(res) => {
				//console.log(res.result)
				let {calendarTasks, delegationTasks, nextTasks, planTasks} = res.result
				this.setData({
					calendarTasks,
					delegationTasks,
					nextTasks,
					planTasks,
					date
				})
				wx.hideLoading()
			},
			(err) => {
				wx.hideLoading()
				console.log(err)
			}
		)
	},
	handleChange(event){
		const type = event.detail.type
		let currentPage = this.data.currentPage
        if (type === 'next') {
			currentPage++
			this.setData({
				currentPage,
				listNameAction: 'fadeOutLeft',
				listAction: 'hinge'
			})
			setTimeout(()=>{
				this.setData({
					currentListName: this.data.listNames[currentPage-1],
					listNameAction: 'fadeInRight',
					listAction: 'jackInTheBox',
					currentList: currentPage
				})
			},300)
        } else if (type === 'prev') {
			currentPage--
			this.setData({
				currentPage,
				listNameAction: 'fadeOutRight',
				listAction: 'rotateOutUpLeft'
			})
			setTimeout(()=>{
				this.setData({
					currentListName: this.data.listNames[currentPage-1],
					listNameAction: 'fadeInLeft',
					listAction: 'jackInTheBox',
					currentList: currentPage
				})
			},300)
		}
		
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