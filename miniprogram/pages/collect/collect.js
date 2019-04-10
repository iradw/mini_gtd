// miniprogram/pages/collect/collect.js
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
		inputTask: ''
		
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
				tagColor: '#ffff00',	//颜色随机?
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
		this.setData({
			[xstr]: xrpx + 'rpx',
			[ystr]: yrpx + 'rpx'
		})
		let list = this.isInSomeBox(xrpx + 125, yrpx + 25)
		if(list)
			console.log(list)
		
			
		
		
	},
	isInSomeBox(x, y){
		if (x > 110 && x < 210){
			if (y > 605 && y < 705)
				return 'c_list'
			else if (y > 755 && y < 855)
				return 'p_list'
		}
		else if (x > 325 && x < 425){
			if (y > 605 && y < 705)
				return 'n_list'
			else if (y > 755 && y < 855)
				return 'wish_list'
		}
		else if (x > 540 && x < 640){
			if (y > 605 && y < 705)
				return 'w_list'
			else if (y > 755 && y < 855)
				return 'r_list'
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