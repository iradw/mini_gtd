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
				x: '200rpx',				//
				y: '200rpx',				//y的范围为0-450rpx
				open: false
			},
			{
				taskContent: '学习vue框架',
				tagColor: '#ffff00',
				x: '100rpx',
				y: '300rpx',
				open: false
			},
			{
				taskContent: '做网络通讯即使聊天系统',
				tagColor: '#ff00ff',
				x: '400rpx',
				y: '350rpx',
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
		console.log(this.data.inputTask)
		this.setData({
			tasks: this.data.tasks.concat({
				taskContent: this.data.inputTask,
				tagColor: '#ffff00',	//颜色随机?
				x: '150rpx',		//坐标随机?
				y: '200rpx',
				open: false
			})
		})
	},
	onClickTag(event){	//点击标签
		//console.log(event.target.dataset.index)索引值
		let index = event.target.dataset.index
		let open = 'tasks['+index+'].open'
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