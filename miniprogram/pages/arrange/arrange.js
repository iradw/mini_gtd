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

    editList:[],
    toView:'calendar',
    isEdit: false,
    editClick:true,
    iClass: [
      {
        dataHash: 'calendar',
        imageSrc: '../../images/arrange_calendar',
        content: '日程表',
        active: true
      },
      {
        dataHash: 'nextstep',
        imageSrc: '../../images/arrange_next',
        content: '下一步',
        active: false
      },
      {
        dataHash: 'plan',
        imageSrc: '../../images/arrange_plan',
        content: '计划',
        active: false
      },
      {
        dataHash: 'wait',
        imageSrc: '../../images/arrange_delegation',
        content: '委托',
        active: false
      },
      {
        dataHash: 'wish',
        imageSrc: '../../images/arrange_someday',
        content: '将来某天',
        active: false
      },
      {
        dataHash: 'reference',
        imageSrc: '../../images/arrange_reference',
        content: '参考',
        active: false
      }
    ]
  },
  
  //从数据库得到数据
  getData() {
    wx.cloud.callFunction({
      name: 'arrange_getData',
      data: {},
      success: res => {
          // console.log(res)
          let tasksFromDB = res.result.calendar_list.data[0].tasks
          
          let calendarlist = []
          for (let i in tasksFromDB) {
            if(tasksFromDB[i].isFinish){}
            else{
            let id = "calendar_list"+tasksFromDB[i].taskId
            calendarlist.push({
              date:tasksFromDB[i].date,
              index:i,
              taskid:tasksFromDB[i].taskId,
              taskclass:"calendar_list",
              id: id,
              checked:false,
              message: tasksFromDB[i].task,
            })
          }}
          //console.log(tasks)
          
          


         tasksFromDB = res.result.delegation_list.data[0].tasks
        let waitlist = []
        //console.log(tasksFromDB)
        for (let i in tasksFromDB) {
          if (tasksFromDB[i].isFinish) { }
          else {
          let id = "delegation_list" + tasksFromDB[i].taskId
            waitlist.push({
              index:i,
            taskid: tasksFromDB[i].taskId,
            taskclass: "delegation_list",
            id: id,
            checked: false,
            message: tasksFromDB[i].task,
          })
        }}
        //console.log(tasks)
        
        


         tasksFromDB = res.result.next_list.data[0].tasks
        let nextsteplist=[]
        //console.log(tasksFromDB)
        for (let i in tasksFromDB) {
          if (tasksFromDB[i].isFinish) { }
          else {
          let id = "next_list" + tasksFromDB[i].taskId
          nextsteplist.push({
            index:i,
            taskid: tasksFromDB[i].taskId,
            taskclass: "next_list",
            id: id,
            checked: false,
            message: tasksFromDB[i].task,
          })
        }}
        //console.log(tasks)
        
        


         tasksFromDB = res.result.plan_list.data[0].tasks
        let planlist = []
        //console.log(tasksFromDB)
        for (let i in tasksFromDB) {
          if (tasksFromDB[i].isFinish) { }
          else {
          let id = "plan_list" + tasksFromDB[i].taskId
          planlist.push({
            index:i,
            taskid: tasksFromDB[i].taskId,
            taskclass: "plan_list",
            id: id,
            checked: false,
            message: tasksFromDB[i].task,
          })
        }}
        //console.log(tasks)
        
        
         

         tasksFromDB = res.result.reference_list.data[0].tasks
        let referencelist = []
        //console.log(tasksFromDB)
        for (let i in tasksFromDB) {
          if (tasksFromDB[i].isFinish) { }
          else {
          let id = "reference_list" + tasksFromDB[i].taskId
          referencelist.push({
            index:i,
            taskid: tasksFromDB[i].taskId,
            taskclass: "reference_list",
            id: id,
            checked: false,
            message: tasksFromDB[i].task,
          })
        }}
        //console.log(tasks)
        
        


         tasksFromDB = res.result.someday_list.data[0].tasks
        let wishlist = []
        //console.log(tasksFromDB)
        for (let i in tasksFromDB) {
          if (tasksFromDB[i].isFinish) { }
          else {
          let id = "someday_list" + tasksFromDB[i].taskId
          wishlist.push({
            index:i,
            taskid: tasksFromDB[i].taskId,
            taskclass: "someday_list",
            id: id,
            checked: false,
            message: tasksFromDB[i].task,
          })
        }}
        //console.log(tasks)
        this.setData({
          calendarlist,
          nextsteplist,
          planlist,
          referencelist,
          waitlist,
          wishlist
        })
        //console.log(calendarlist)
        //console.log(nextsteplist)
        //console.log(planlist)
        //console.log(referencelist)
        //console.log(waitlist)
        //console.log(wishlist)
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
  onLoad:function(options){
    let regular = getApp().globalData.regular
    if (!regular){
      wx.navigateTo({
        url: '/pages/my/tutorial/tutorial',
        success: function(res) {
          getApp().globalData.regular = !regular
        },
        fail: function(res) {},
        complete: function(res) {},
      })
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
    // console.log(e.currentTarget.dataset.index)
    let iClass = this.data.iClass
    iClass.forEach((item, index) => {
      item.active = false
    })
    iClass[e.currentTarget.dataset.index].active = true
    this.setData({
      toView: e.currentTarget.dataset.hash,
      iClass

    })
  },
  thingjump:function(e){
    if(this.data.isEdit){
      
    }
    else{
    let number=e.currentTarget.dataset.number
    let id=e.currentTarget.id
    let thingclass=null
    let indexnumber=null
    if (id.indexOf("calendar_list") != -1){
      thingclass="calendar_list"
      indexnumber=this.data.calendarlist[number].index
    }
    if (id.indexOf("delegation_list") != -1) {
      indexnumber = this.data.waitlist[number].index
      thingclass = "delegation_list"
    }
    if (id.indexOf("next_list") != -1) {
      indexnumber = this.data.nextsteplist[number].index
      thingclass = "next_list"
    }
    if (id.indexOf("plan_list") != -1) {
      indexnumber = this.data.planlist[number].index
      thingclass = "plan_list"
    }
    if (id.indexOf("reference_list") != -1) {
      indexnumber = this.data.referencelist[number].index
      thingclass ="reference_list"
    }
    if (id.indexOf("someday_list") != -1) {
      indexnumber = this.data.wishlist[number].index
      thingclass = "someday_list"
    }
    //console.log(thingclass)
    console.log(indexnumber)
    wx.navigateTo({
      url: `../detail/detail?collectionName=${thingclass}&taskIndex=${indexnumber}`
    })}
  },

  calendarJump:function(e){
    if(this.data.isEdit){
      return
    }
    let number = e.currentTarget.dataset.number
    //console.log(number)
    let thingclass = "calendar_list"
    getApp().globalData.calendarJumpData = this.data.calendarlist[number].date
    //console.log(this.data.calendarlist[number].date)
    wx.switchTab({
      url: '/pages/calendar/calendar',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },
  editClick:function(e){
    if(this.data.isEdit){
      console.log(this.data.editList)
      this.setData({
        isEdit: false,
        editClick: true
      })
      console.log(this.data.editList)
      let arry = this.data.editList
      console.log(arry)
      wx.cloud.callFunction({
        name: 'arrange_isFinish',
        data: {
          eventFlags: "otherTask",
          collectionName: arry,
          taskIndex: arry
          // stepIndex: stepIndex
        }
      }).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
      for(let i in arry){
        let id=arry[i].id
        let number=arry[i].number
        if (id === "calendarlist") {
          let calendarlist = this.data.calendarlist
          calendarlist.splice(number,1)
          this.setData({
            calendarlist
          })
        }
        if (id === "nextsteplist") {
          let nextsteplist = this.data.nextsteplist
          nextsteplist.splice(number, 1)
          this.setData({
            nextsteplist
          })
        }
        if (id === "planlist") {
          let planlist = this.data.planlist
          planlist.splice(number, 1)
          this.setData({
            planlist
          })
        }
        if (id === "waitlist") {
          let waitlist = this.data.waitlist
          waitlist.splice(number, 1)
          this.setData({
            waitlist
          })
        }
        if (id === "wishlist") {
          let wishlist = this.data.wishlist
          wishlist.splice(number, 1)
          this.setData({
            wishlist
          })
        }
        if (id === "referencelist") {
          let referencelist = this.data.referencelist
          referencelist.splice(number, 1)
          this.setData({
            referencelist
          })
        }  
      }
    }
    else{
      this.data.editList=[]
    this.setData({
      isEdit:true,
      editClick:false
    })}
  },
  checkClick:function(e){
    let editList = this.data.editList
    let index=null
    let content = null
    if (e.currentTarget.dataset.checked){
      let number = e.currentTarget.dataset.number
      let id = e.currentTarget.id
      
      if (id === "calendarlist") {
        let calendarlist = this.data.calendarlist
        calendarlist[number].checked = false
        index = calendarlist[number].index
        content="calendar_list"
        this.setData({
          calendarlist
        })
      }
      if (id === "nextsteplist") {
        let nextsteplist = this.data.nextsteplist
        nextsteplist[number].checked = false
        index = nextsteplist[number].index
        content="next_list"
        this.setData({
          nextsteplist
        })
      }
      if (id === "planlist") {
        let planlist = this.data.planlist
        planlist[number].checked = false
        index = planlist[number].index
        content="plan_list"
        this.setData({
          planlist
        })
      }
      if (id === "waitlist") {
        let waitlist = this.data.waitlist
        waitlist[number].checked = false
        index = waitlist[number].index
        content="delegation_list"
        this.setData({
          waitlist
        })
      }
      if (id === "wishlist") {
        let wishlist = this.data.wishlist
        wishlist[number].checked = false
        index = wishlist[number].index
        content="someday_list"
        this.setData({
          wishlist
        })
      }
      if (id === "referencelist") {
        let referencelist = this.data.referencelist
        referencelist[number].checked = false
        index = referencelist[number].index
        content="reference_list"
        this.setData({
          referencelist
        })
      }

      for (let i in editList){
        if (editList[i].content === content && editList[i].index==index)
        {
          editList.splice(i,1)
        }}}
    else{
      let newlist={}
      let number = e.currentTarget.dataset.number
      let id = e.currentTarget.id
      newlist.number=number
      newlist.id=id

      if (id === "calendarlist") {
        let calendarlist = this.data.calendarlist
        calendarlist[number].checked=true
        index = calendarlist[number].index
        content="calendar_list"
        this.setData({
          calendarlist
        })
      }
      if (id === "nextsteplist") {
        let nextsteplist = this.data.nextsteplist
        nextsteplist[number].checked = true
        index = nextsteplist[number].index
        content="next_list"
        this.setData({
          nextsteplist
        })
      }
      if (id === "planlist") {
        let planlist = this.data.planlist
        planlist[number].checked = true
        index = planlist[number].index
        content="plan_list"
        this.setData({
          planlist
        })
      }
      if (id === "waitlist") {
        let waitlist = this.data.waitlist
        waitlist[number].checked = true
        index = waitlist[number].index
        content="delegation_list"
        this.setData({
          waitlist
        })
      }
      if (id === "wishlist") {
        let wishlist = this.data.wishlist
        wishlist[number].checked = true
        index = wishlist[number].index
        content="someday_list"
        this.setData({
          wishlist
        })
      }
      if (id === "referencelist") {
        let referencelist = this.data.referencelist
        referencelist[number].checked = true
        index = referencelist[number].index
        content="reference_list"
        this.setData({
          referencelist
        })
      }
      newlist.content=content
      newlist.index = index
      editList.unshift(newlist)
    }
    this.setData({
      editList
    })
    console.log(editList)
  }
})