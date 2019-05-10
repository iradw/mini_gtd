// miniprogram/pages/arrange/arrange.js
Page({
	/**
	 * 页面的初始数据
	 */
  data: {
    calendarlist:[],
    nextsteplist: [],
    planlist: [],
    waitlist: [],
    wishlist: [],
    referencelist: [],
    toView:'calendar',
  },
  //从数据库得到数据
  getData() {
    // wx.showLoading({
    //   title: '正在加载数据',
    //   mask: true

    // })
    wx.cloud.callFunction({
      name: 'arrange_getData',
      data: {},
      success: res => {
          let tasksFromDB = res.result.calendar_list.data[0].tasks
          let calendarlist = []
          //console.log(tasksFromDB)
          for (let i in tasksFromDB) {
            let id = "calendar_list"+tasksFromDB[i].taskId
            calendarlist.push({
              taskid:tasksFromDB[i].taskId,
              taskclass:"calendar_list",
              id: id,
              message: tasksFromDB[i].task,
            })
          }
          //console.log(tasks)
          this.setData({
            calendarlist
          })
          wx.hideLoading()


         tasksFromDB = res.result.delegation_list.data[0].tasks
        let waitlist = []
        //console.log(tasksFromDB)
        for (let i in tasksFromDB) {
          let id = "delegation_list" + tasksFromDB[i].taskId
            waitlist.push({
            taskid: tasksFromDB[i].taskId,
            taskclass: "delegation_list",
            id: id,
            message: tasksFromDB[i].task,
          })
        }
        //console.log(tasks)
        this.setData({
          waitlist
        })
        wx.hideLoading()


         tasksFromDB = res.result.next_list.data[0].tasks
        let nextsteplist=[]
        //console.log(tasksFromDB)
        for (let i in tasksFromDB) {
          let id = "next_list" + tasksFromDB[i].taskId
          nextsteplist.push({
            taskid: tasksFromDB[i].taskId,
            taskclass: "next_list",
            id: id,
            message: tasksFromDB[i].task,
          })
        }
        //console.log(tasks)
        this.setData({
          nextsteplist
        })
        wx.hideLoading()


         tasksFromDB = res.result.plan_list.data[0].tasks
        let planlist = []
        //console.log(tasksFromDB)
        for (let i in tasksFromDB) {
          let id = "plan_list" + tasksFromDB[i].taskId
          planlist.push({
            taskid: tasksFromDB[i].taskId,
            taskclass: "plan_list",
            id: id,
            message: tasksFromDB[i].task,
          })
        }
        //console.log(tasks)
        this.setData({
          planlist
        })
        wx.hideLoading()
         

         tasksFromDB = res.result.reference_list.data[0].tasks
        let referencelist = []
        //console.log(tasksFromDB)
        for (let i in tasksFromDB) {
          let id = "reference_list" + tasksFromDB[i].taskId
          referencelist.push({
            taskid: tasksFromDB[i].taskId,
            taskclass: "reference_list",
            id: id,
            message: tasksFromDB[i].task,
          })
        }
        //console.log(tasks)
        this.setData({
          referencelist
        })
        wx.hideLoading()


         tasksFromDB = res.result.someday_list.data[0].tasks
        let wishlist = []
        //console.log(tasksFromDB)
        for (let i in tasksFromDB) {
          let id = "someday_list" + tasksFromDB[i].taskId
          wishlist.push({
            taskid: tasksFromDB[i].taskId,
            taskclass: "someday_list",
            id: id,
            message: tasksFromDB[i].task,
          })
        }
        //console.log(tasks)
        this.setData({
          wishlist
        })
        wx.hideLoading()

          },
      fail: err => {
          wx.hideLoading()
          wx.showToast({
            title: '加载数据失败,请检查您的网络',
            icon: 'none'
          })
        }
    })
  },

  //搜索跳转
  jump(){
    var jumpid = null
    var id = getApp().globalData.thingid
    console.log(id)
    if (id !== undefined) {
      for (let i = 0; i < this.data.referencelist.length; ++i) {
        if (this.data.referencelist[i].message.equal === id) {
          jumpid = this.data.referencelist[i].id
          break
        }
      }
      for (let i = 0; i < this.data.wishlist.length; ++i) {
        if (this.data.wishlist[i].message === id) {
          jumpid = this.data.wishlist[i].id
          break
        }
      }
      for (let i = 0; i < this.data.waitlist.length; ++i) {
        if (this.data.waitlist[i].message === id) {
          jumpid = this.data.waitlist[i].id
          break
        }
      }
      for (let i = 0; i < this.data.planlist.length; ++i) {
        if (this.data.planlist[i].message === id) {
          jumpid = this.data.planlist[i].id
          break
        }
      }
      for (let i = 0; i < this.data.nextsteplist.length; ++i) {
        if (this.data.nextsteplist[i].message === id) {
          jumpid = this.data.nextsteplist[i].id
          break
        }
      }
      for (let i = 0; i < this.data.calendarlist.length; ++i) {
        if (this.data.calendarlist[i].message === id) {
          jumpid = this.data.calendarlist[i].id
          break
        }
      }
    }
    this.setData({
      toView: jumpid
    })
    jumpid = null 
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad:function(){
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
    this.getData()
    this.jump()
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

	},
  jumppage:function(){
    wx.navigateTo({
      url: '/pages/find/find',
    })
  },
  click: function (e) {
    this.setData({
      toView: e.currentTarget.dataset.hash
    })
  },
  thingjump:function(e){
    let number=e.currentTarget.dataset.number
    let id=e.currentTarget.id
    let thingclass=null
    if (id.indexOf("calendar_list") != -1){
      thingclass="calendar_list"
    }
    if (id.indexOf("delegation_list") != -1) {
      thingclass = "delegation_list"
    }
    if (id.indexOf("next_list") != -1) {
      thingclass = "next_list"
    }
    if (id.indexOf("plan_list") != -1) {
      thingclass = "plan_list"
    }
    if (id.indexOf("reference_list") != -1) {
      thingclass ="reference_list"
    }
    if (id.indexOf("someday_list") != -1) {
      thingclass = "someday_list"
    }
    //console.log(thingclass)
    //console.log(number)
    wx.navigateTo({
      url: `../detail/detail?collectionName=${thingclass}&taskIndex=${number}`
    })
  }
})