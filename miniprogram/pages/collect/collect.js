// miniprogram/pages/collect/collect.js
let utils = require('../../utils/utils')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tasks: [
			{
				taskContent: '制作微信小程序',
				tagColor: '#ff0000',
				x: '200rpx',				//x的范围为0-500rpx
				y: '200rpx',				//y的范围为0-500rpx
				open: false
			}
		],
		inputTask: '',	//输入框中输入的事件
		boxes: [		//所有的盒子
			{
				x: '110rpx',
				y: '605rpx',
				boxSrc: '../../images/box.png',
				text: '日程表',
				id: 'c-list'
			},
			{
				x: '325rpx',
				y: '605rpx',
				boxSrc: '../../images/box.png',
				text: '下一步',
				id: 'n-list'
			},
			{
				x: '540rpx',
				y: '605rpx',
				boxSrc: '../../images/box.png',
				text: '等待',
				id: 'w-list'
			},
			{
				x: '110rpx',
				y: '755rpx',
				boxSrc: '../../images/box.png',
				text: '计划',
				id: 'p-list'
			},
			{
				x: '325rpx',
				y: '755rpx',
				boxSrc: '../../images/box.png',
				text: '愿望',
				id: 'wish-list'
			},
			{
				x: '540rpx',
				y: '755rpx',
				boxSrc: '../../images/box.png',
				text: '参考',
				id: 'r-list'
			}
		],
		selectedBox: null,	//标签选中的盒子索引
		selectedTagToBox: null,//放在盒子上的标签的索引
		showDialog: false,	//标签放进盒子的弹窗
		dialogText: '',		//标签放进盒子的弹窗信息
		showDeleteDialog: false,//标签删除的弹窗
		deleteTaskIndex: null//要删除的标签的索引
	},
	onTaskInput(event){	//输入事件
		//console.log(event.detail.value)
		this.setData({
			inputTask: event.detail.value
		})
	},

	onClickAdd(){	//点击添加按钮
		//console.log(this.data.inputTask)
		this.setData({
			/*
			 * 生成一个x~y的随机数	
			 * Math.round(Math.random()*(y-x)+x)
			 */
			tasks: this.data.tasks.concat({
				taskContent: this.data.inputTask,
				tagColor: utils.randomColor(),	//颜色随机?
				x: Math.round(Math.random()*500) + 'rpx',		//x坐标随机0-500 
				y: Math.round(Math.random()*500) + 'rpx',		//px = rpx / 750 * wx.getSystemInfoSync().windowWidth
				open: false										//rpx = px * 750 / wx.getSystemInfoSync().windowWidth
			}),
			inputTask: ''
		})

	},
	

	onDrag(event){
		let xrpx = event.detail.x * 750 / wx.getSystemInfoSync().windowWidth
		let yrpx = event.detail.y * 750 / wx.getSystemInfoSync().windowWidth
		let index = event.target.dataset.index	//拖动的标签的索引 tasks数组下表
		let xstr = 'tasks['+index+'].x'
		let ystr = 'tasks['+index+'].y'
		this.setData({							//把标签位置记录
			[xstr]: xrpx + 'rpx',
			[ystr]: yrpx + 'rpx'
		})
		let boxIndex = this.isInSomeBox(xrpx + 125, yrpx + 25)
		// console.log(boxIndex)
		if(boxIndex !== null && boxIndex !== undefined ){		//if选中了一个盒子
			let boxSrcStr = 'boxes['+boxIndex+'].boxSrc'
			this.setData({
				[boxSrcStr]: '../../images/box_on.png',
				selectedBox: boxIndex
			})
		}else {	//没有选中某个盒子 要恢复原来的样式
			for(let i in this.data.boxes){
				let boxSrcStr = 'boxes['+i+'].boxSrc'
				this.setData({
					[boxSrcStr]: '../../images/box.png',
					selectedBox: null
				})
			}			
		}
	},
	onTouchEnd(event){	//松开标签
		let selectedBox = this.data.selectedBox				//标签选中的盒子的索引
		if(selectedBox !== null){
			let boxName = this.data.boxes[selectedBox].text	//标签选中的盒子的名字
			let selectedTagToBox = event.target.dataset.index		//选中盒子的标签的索引
			//console.log(`${event.target.dataset.index}选中了${selectedBox}号箱子`)
			this.setData({
				showDialog: true,
				dialogText: `确认将把这件事放入${boxName}中`,
				selectedTagToBox: selectedTagToBox
			})
		}
			
	},
	isInSomeBox(x, y){
		if (x > 110 && x < 210){
			if (y > 605 && y < 705)
				return 0
			else if (y > 755 && y < 855)
				return 3
		}
		else if (x > 325 && x < 425){
			if (y > 605 && y < 705)
				return 1
			else if (y > 755 && y < 855)
				return 4
		}
		else if (x > 540 && x < 640){
			if (y > 605 && y < 705)
				return 2
			else if (y > 755 && y < 855)
				return 5
		}
		else
			return null
	},

	onClickTag(event){	//点击标签
		//console.log(event.target.dataset.index)索引值
		let index = event.target.dataset.index	////拖动的标签的索引 tasks数组下表
		let open = 'tasks['+index+'].open'	//键名
		this.setData({
			[open]: !(this.data.tasks[index].open)
		})
	},

	//弹窗点击确认
	onDialogConfirm(event){
		//console.log(`确认: 要添加的标签索引: ${this.data.selectedTagToBox} 要加入的盒子索引: ${this.data.selectedBox}`)
		this.setData({
			showDialog: false,
			dialogText: '',
			//把标签信息放到数据库中 还要移除这个标签
		})
		
	},

	//弹窗点击取消
	onDialogCancel(event){
		this.setData({
			showDialog: false,
			dialogText: ''
		})
	},

	//点击删除按钮
	onClickDelete(event){
		console.log(event.currentTarget.dataset.index)
		this.setData({
			showDeleteDialog: true,
			deleteTaskIndex: event.currentTarget.dataset.index	//获取要删除的标签索引
		})
		
	},
	//删除弹窗点击确认
	onDeleteConfirm(event){
		let tasks = this.data.tasks
		//console.log(`删除了${this.data.deleteTaskIndex}`)
		tasks.splice(this.data.deleteTaskIndex, 1)
		this.setData({
			tasks,
			showDeleteDialog: false,
		})
	},
	//删除弹窗点击取消
	onDeleteCancel(){
		this.setData({
			showDeleteDialog: false,
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