// miniprogram/pages/my/aboutGTD/aboutGTD.js
wx.cloud.init()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		calendar: '',
		clear: [],
		delegation: '',
		execute: '',
		next: '',
		overview: '',
		plan: '',
		review: '',
		someday: '',
		title: '',
		towmin: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.showLoading({
			title: '正在加载数据'
		})
		wx.cloud.callFunction({
			name: 'my_aboutGTD',
			data:{

			}
		}).then(
			(res) => {
				console.log(res.result)
				let {calendar, clear, collect, delegation, execute, next, overview, plan, review, someday, twomin} = res.result
				this.setData({
					calendar,
					clear,
					collect,
					delegation,
					execute,
					next,
					overview,
					plan,
					review,
					someday,
					twomin
				})
				wx.hideLoading()
			},
			(err) => {
				console.log(err)
			}
		)
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