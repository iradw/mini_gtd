// miniprogram/pages/calendar/calendar.js
const { $Message } = require('../../lib/iview/base/index')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		year: 2019,
		month: 5,
		day: 8,
		daysColor: [
			{
				month: 'current',
				day: 9,
				color: '#1c2438',
				background: '#ff9900'
			}
		],
		deleteModal: false,
		tasks: [
			{
				taskId: '1557299959689',
				task: '井超的破实验',
				date: '2019-05-12',
				isFinish: false,
				remark: '我讨厌井超',

				isTaskModify: false,			//事件是否处于修改状态
				isRemarkModify: false,			//备注是否处于修改状态
			},
			{
				taskId: '1557299959999',
				task: '质优价低',
				date: '2019-05-19',
				isFinish: true,
				remark: '优个卵子',

				isTaskModify: false,			//事件是否处于修改状态
				isRemarkModify: false,			//备注是否处于修改状态
			}
		]
	},
	otherData: {
		deleteIndex: '',
		deleteTaskId: ''
	},
	onDayClick(event){
		// console.log(event)
		let {year, month, day} = event.detail
		let colorStrOfDay = 'daysColor[0].day'
		this.setData({
			[colorStrOfDay]: day,
			year,
			month,
			day
		})
		console.log(this.data.year, this.data.month, this.data.day)

	},
	setDayColor(year, month, day){

	},

	//点击事件名的修改图标
	onClickTaskModify(event){
		//点击的卡片索引
		// console.log(event.target.dataset.index)	
		let tasks = this.data.tasks
		//让输入框获取启用并获取焦点
		tasks[event.target.dataset.index].isTaskModify = true
		this.setData({
			tasks
		})
	},

	/*********************修改事件内容区*********************/
	//事件输入框的如数监听
	onTaskInput(event){
		// console.log(event.detail.value)
		let tasks = this.data.tasks
		tasks[event.target.dataset.index].task = event.detail.value
		//让输入框获取焦点
		this.setData({
			tasks
		})
	},

	//修改完点击键盘完成 或失去了焦点
	//点击完成(电脑是回车)后this.data的数据是最新状态 可以直接连接后台
	onTaskBlur(event){
		// console.log(event.target.dataset.index)
		let tasks = this.data.tasks
		//让输入框获取禁用并失去焦点
		tasks[event.target.dataset.index].isTaskModify = false
		this.setData({
			tasks
		})
		/*****************************
			在此操作后台 修改事件内容
		*****************************/
	},

	/*********************~修改事件内容区*********************************/


	/*********************修改备注内容区*********************/
	//点击事件内容的修改图标
	onClickRemarkModify(event){
		//点击的卡片索引
		// console.log(event.target.dataset.index)	
		let tasks = this.data.tasks
		//让输入框获取启用并获取焦点
		tasks[event.target.dataset.index].isRemarkModify = true
		this.setData({
			tasks
		})
	},


	//备注输入框的如数监听
	onRemarkInput(event){
		// console.log(event.detail.value)
		let tasks = this.data.tasks
		tasks[event.target.dataset.index].remark = event.detail.value
		//让输入框获取焦点
		this.setData({
			tasks
		})
	},

	//修改完点击键盘完成 或失去了焦点
	//点击完成(电脑是回车)后this.data的数据是最新状态 可以直接连接后台
	onRemarkBlur(event){
		// console.log(event.target.dataset.index)
		let tasks = this.data.tasks
		//让输入框获取禁用并失去焦点
		tasks[event.target.dataset.index].isRemarkModify = false
		this.setData({
			tasks
		})
		console.log(this.data.tasks)
		/***********************************************************
			在此操作后台 修改备注内容
		***********************************************************/
	},

	

	/*********************~修改备注内容区*********************/

	/*********************点击完成区*********************/

	onClickFinish(event){
		// console.log(event.currentTarget.dataset.index, '完成')
		let index = event.currentTarget.dataset.index	//点击的卡片索引
		

		let tasks = this.data.tasks
		let {isFinish, taskId} = tasks[index]	//获取当前完成状态和点击事件的taskId
		tasks[index].isFinish = !isFinish
		this.setData({
			tasks
		})
		
	},


	/*********************~点击完成区*********************/


	/*********************点击删除区*********************/
	onClickDelete(event){
		this.setData({
			deleteModal: true
		})
		
		let index = event.currentTarget.dataset.index	//点击的卡片索引
		this.otherData.deleteIndex = index
		this.otherData.deleteTaskId = this.data.tasks[index].taskId
		
	},
	//删除确认弹窗点击确认
	onDeleteConfirm(){
		let tasks = this.data.tasks
		let {deleteIndex, deleteTaskId} = this.otherData
		tasks.splice(deleteIndex, 1)
		this.setData({
			tasks,
			deleteModal: false
		})
		/***********************************************************
			taskId以获取 在此操作后台 删除事件
		***********************************************************/
	},
	//删除确认弹窗点击取消
	onDeleteCancel(){
		this.setData({
			deleteModal: false
		})
	},
	/*********************~点击删除区*********************/

	/*********************点击添加区*********************/
	onClickAdd(event){

		let tasks = this.data.tasks
		let newTask = {
			taskId: new Date().getTime().toString(),
			task: '',
			date: `${this.data.year}-${this.data.month}-${this.data.day}`,
			isFinish: false,
			remark: '',

			isTaskModify: false,			//事件是否处于修改状态
			isRemarkModify: false,			//备注是否处于修改状态
		}
		tasks.push(newTask)
		this.setData({
			tasks
		})
	},


	/*********************~点击添加区*********************/
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