// miniprogram/pages/calendar/calendar.js
import utils from '../../utils/utils.js'
import moment from '../../lib/moment.min.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    now:'',
    remark_modify:'',
    task_modify:'',
    id_modify:0,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),

		daysColor: [
		],
		deleteModal: false,
		tasks: [
			// {

			// 	isTaskModify: false,			//事件是否处于修改状态
			// 	isRemarkModify: false,			//备注是否处于修改状态
			// },
			// {
				
			// 	isTaskModify: false,			//事件是否处于修改状态
			// 	isRemarkModify: false,			//备注是否处于修改状态
			// }
		]
	},
	otherData: {
		deleteIndex: '',
		deleteTaskId: ''
	},
	onDayClick(event){
		// console.log(event)
    let { year, month, day } = event.detail
    //console.log(this.data.daysColor)
    let len = this.data.daysColor.length
    let colorStrOfDay = `daysColor[${len - 1}].day`
    this.setData({
      [colorStrOfDay]: day,
      year,
      month,
      day
    })

		wx.cloud.callFunction({
      name:"calendar_get",
      data:{
        year:this.data.year,
        month:this.data.month,
        day:this.data.day
      }
    }).then(
      success=>{
        //console.log(success)
        this.setData({
          tasks:success.result
        })
      }
    )
    
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
		//console.log(event.detail)
		let tasks = this.data.tasks
    let id_modify=this.data.id_modify
    
		tasks[event.target.dataset.index].task = event.detail.value
    //console.log(tasks[event.target.dataset.index].taskId)
    id_modify = tasks[event.target.dataset.index].taskId
		//让输入框获取焦点
		this.setData({
			tasks,
      id_modify
		})
	},

	//修改完点击键盘完成 或失去了焦点
	//点击完成(电脑是回车)后this.data的数据是最新状态 可以直接连接后台
	onTaskBlur(event){
		// console.log(event.target.dataset.index)
		let tasks = this.data.tasks
    let task_modify = this.data.task_modify
    let remark_modify = this.data.remark_modify
		//让输入框获取禁用并失去焦点
		tasks[event.target.dataset.index].isTaskModify = false
    task_modify = tasks[event.target.dataset.index].task
    remark_modify = tasks[event.target.dataset.index].remark
		this.setData({
			tasks,
      task_modify,
      remark_modify
		})
    wx.cloud.callFunction({
      name: "calendar_modify",
      data: {
        taskId:this.data.id_modify,
        year: this.data.year,
        month: this.data.month,
        day: this.data.day,
        remark_input:this.data.remark_modify,
        task_input:this.data.task_modify
      }
      
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
    let id_modify = this.data.id_modify
		tasks[event.target.dataset.index].remark = event.detail.value
    id_modify = tasks[event.target.dataset.index].taskId
		//让输入框获取焦点
		this.setData({
			tasks,
      id_modify
		})
	},

	//修改完点击键盘完成 或失去了焦点
	//点击完成(电脑是回车)后this.data的数据是最新状态 可以直接连接后台
	onRemarkBlur(event){
	// console.log(event.target.dataset.index)
  //console.log("失去价值")
    
		let tasks = this.data.tasks
    let task_modify = this.data.task_modify
    let remark_modify = this.data.remark_modify
		//让输入框获取禁用并失去焦点
		tasks[event.target.dataset.index].isRemarkModify = false
    task_modify = tasks[event.target.dataset.index].task
    remark_modify = tasks[event.target.dataset.index].remark
    this.setData({
      tasks,
      task_modify,
      remark_modify
    })
		console.log(this.data.tasks)
    wx.cloud.callFunction({
      name: "calendar_modify",
      data: {
        taskId: this.data.id_modify,
        year: this.data.year,
        month: this.data.month,
        day: this.data.day,
        remark_input: this.data.remark_modify,
        task_input: this.data.task_modify
      }
    })
		/***********************************************************
			在此操作后台 修改备注内容
      
		***********************************************************/
	},

	

	/*********************~修改备注内容区*********************/

	/*********************点击完成区*********************/

  onClickFinish(event) {
    // console.log(event.currentTarget.dataset.index, '完成')
    let index = event.currentTarget.dataset.index	//点击的卡片索引

    let tasks = this.data.tasks
    let { isFinish, taskId } = tasks[index]	//获取当前完成状态和点击事件的taskId
    tasks[index].isFinish = !isFinish
    this.setData({
      tasks
    })

    wx.cloud.callFunction({
      name: 'calendar_complete',
      data: {
        taskId
      }
    }).then(
      (res) => {
        //console.log(res)
      },
      (err) => {
        //console.log(err)
      }
    )


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
    wx.cloud.callFunction({
      name:'calendar_delete',
      data:{
        taskId:deleteTaskId,
        year:this.data.year,
        month:this.data.month,
        day:this.data.day
      }
    })
    this.getCurrentMonthTasks(this.data.year, this.data.month)

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
    let y=this.data.year
    let m=this.data.month
    let d=this.data.day
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
    let timeS = Date.parse(new Date())
    wx.cloud.callFunction({
      name:'calendar_add',
      data:{
        add_date:this.data.now,
        timeStamp:timeS,
        year:y,
        month:m,
        day:d,
      }
    })
		tasks.push(newTask)
		this.setData({
			tasks
		})
    this.getCurrentMonthTasks(this.data.year, this.data.month)
	},
  //获取当月有task的日期
  getCurrentMonthTasks(year, month) {

    wx.cloud.callFunction({
      name: 'calendar_getCurrentMonthTasks',
      data: {
        year,
        month
      }
    }).then(
      (res) => {
        //console.log(res.result)
        let days = res.result
        let daysColor = []
        days.forEach((day, index) => {
          let remindDay = {
            month: 'current',
            day,
            color: '#1c2438',
            background: '#ff9900'
          }
          daysColor[index] = remindDay
        })
        daysColor.push({
          month: 'current',
          day: this.data.day,
          color: '#1c2438',
          background: '#ed3f14'
        })
        this.setData({
          daysColor,
          year,
          month
        })
      },
      (err) => {
        console.log(err)
      }
    )

  },

  onDateChange(event) {
    this.getCurrentMonthTasks(event.detail.currentYear, event.detail.currentMonth)
    console.log("触发dateChange事件")
  },
  onClickNext(event) {
    this.getCurrentMonthTasks(event.detail.currentYear, event.detail.currentMonth)
  },
  onClickPrev(event) {
    this.getCurrentMonthTasks(event.detail.currentYear, event.detail.currentMonth)
  },

 
/*********************~获取当前的年月日*********************/

	/*********************~点击添加区*********************/
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    let now_s=utils.formatNow()
    let timestamp = Date.parse(new Date())
    // let date = new Date(timestamp)         
    // let Y =date.getFullYear();    //年      
    // let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)   //月    
    // let D = date.getDate() < 10 ?'0'  + date.getDate() : date.getDate()  //日
     this.setData({
        now:now_s,
       //year:parseInt(Y),
       //month:parseInt(M),
       //day:parseInt(D),
       year:this.data.year,
       month:this.data.month,
       day:this.data.day
     })
    wx.cloud.callFunction({
      name: 'calendar_get',
      data: {
        year: this.data.year,
        month: this.data.month,
        day: this.data.day
      },
      success: res => {
        console.log(res.result)
        this.setData({
          tasks: res.result
        })
      },
      fail: err => {
        console.error
      }
    })
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
    let dateFromArrange = getApp().globalData.calendarJumpData
		if (dateFromArrange){
			//console.log(dateFromArrange)
			let mDfa = moment(dateFromArrange, "YYYY-MM-DD")
			let day = mDfa.date()
			let month = mDfa.month()+1
			let year = mDfa.year()
			this.setData({
				day,
				month,
				year
			})
    }
    this.getCurrentMonthTasks(this.data.year, this.data.month)
    
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