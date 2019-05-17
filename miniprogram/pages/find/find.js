// pages/find/find.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存储搜索记录，固定五个值
    historylist:[
      ],
      //所有事的总库，用来搜索
    allthings:[],
    //得到的符合搜索的库
    resultlist:[{result:'无结果'}],
    value:'',//搜索input的值
    focus: false
  },

  getData() {
    wx.showLoading({
      title: '正在加载数据',
      mask: true

    })
    wx.cloud.callFunction({
      name: 'arrange_getData',
      data: {},
      success: res => {
        let tasksFromDB = res.result.calendar_list.data[0].tasks
        tasksFromDB=tasksFromDB.concat(res.result.delegation_list.data[0].tasks)
        tasksFromDB=tasksFromDB.concat(res.result.next_list.data[0].tasks)
        tasksFromDB=tasksFromDB.concat(res.result.plan_list.data[0].tasks)
        tasksFromDB=tasksFromDB.concat(res.result.reference_list.data[0].tasks)
        tasksFromDB=tasksFromDB.concat(res.result.someday_list.data[0].tasks)
        let allthings = []
        for (let i in tasksFromDB) {
          let id = "allthings" + tasksFromDB[i].taskId
          allthings.push({
            taskid: tasksFromDB[i].taskId,
            taskclass: "allthings",
            id: id,
            thing: tasksFromDB[i].task,
          })
        }
        this.setData({
          allthings,
          focus: true
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

getHistorylist(){
  try {
    var value = wx.getStorageSync('historylist')
    if (value) {
      console.log(value)
       this.data.historylist=[]
      let historyvalue = []
       for(let i in value){
         let list = {}
         let valuecontent=value[i].content
         list.content = valuecontent
         historyvalue.unshift(list)
         console.log(historyvalue)
       }
      this.setData({
        historylist: historyvalue
      })
    }
  } catch (e) {
  }
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
    this.getData()
    this.getHistorylist()

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
  //点击搜索结果事件，实现跳转
  jumpresult: function (e) {
    let id = e.currentTarget.dataset.id 
    getApp().globalData.thingid=id 
    wx.switchTab({
      url: '/pages/arrange/arrange',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    }) 
  },
  //点击搜索记录结果，实现搜索
  jumphistory:function(e){
    let history = e.currentTarget.dataset.id;
    let length = this.data.allthings.length;
    let resultlist = this.data.resultlist
    let haveresult = 0;
    for (let i = 0; i < length; i++) {
      let allthings = this.data.allthings[i].thing;
      if (allthings.indexOf(history) != -1) {
        let newresultlist = { result: this.data.allthings[i].thing };
        newresultlist.result = this.data.allthings[i].thing;
        resultlist.unshift(newresultlist);
        haveresult = 1;
      }
    }
    if (haveresult == 1) {
      resultlist.pop();
    }
    this.setData({
      resultlist: resultlist
    })
    this.data.resultlist = [{ result: '无结果' }];
  },
  //获取input里value值
  getvalue:function(e){
    this.setData({
      value: e.detail.value
    })
  },
  //搜索按钮
  searchclick:function(e){
    //改变搜索记录
     let value=this.data.value
    let historyvalue = this.data.historylist
    let newlist={};
    newlist.content=value;
    historyvalue.unshift(newlist);
    if (historyvalue.length > 5) {
      historyvalue.pop();
    }
    console.log(historyvalue)
    this.setData({
      historylist: historyvalue
    })
    try {
      wx.setStorageSync('historylist', historyvalue)
    } catch (e) {
      console.log(historyvalue)
    }
    //改变搜索结果
    let length=this.data.allthings.length;
    let resultlist=this.data.resultlist
    let haveresult=0;
    for(let i=0;i<length;i++){
      let allthings=this.data.allthings[i].thing;
      if (allthings.indexOf(value) != -1){
        let newresultlist = { result: this.data.allthings[i].thing};
        newresultlist.result = this.data.allthings[i].thing;
        resultlist.unshift(newresultlist);
        haveresult=1;
      }
    }
    if(haveresult==1){
      resultlist.pop();
      }
    this.setData({
      resultlist:resultlist
    })
    this.data.resultlist=[{result:'无结果'}];
    }
})