// pages/detail/detail.js
let moment = require('../../lib/moment.min.js')
let utils = require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskData: 3,
    //current: 2,
    //verticalCurrent: 2,
    collectionName: "",
    taskIndex: 0,
    task: '',
    focus: false,
    startDate: '2019-4-13',
    endDate: '2019-4-29',
    addDate: 0,
    showDeleteDialog: false,
    showCompleteDialog: false,
    steps: [
      // {
      //   value: 'value1',
      //   disable: 'true',
      //   status: false,
      //   textDecoration: 'none',
      //   flags: "1",
      //   buttonText: "完成",
      // },
      // {
      //   value: 'value2',
      //   disable: 'true',
      //   status: true,
      //   textDecoration: 'none',
      //   flags: "1",
      //   buttonText: "完成",
      // }
    ],
    //status: true, //true为正常显示，false为显示删除按钮
    //buttonText: "完成",
    editDisable: true,
    showDate: false,
    showDialog: false,
    goIndex: 0,
    goTaskItem:"",
    planStartDate: 0,
    planEndDate: 0,
    calendarDate: 0,
    listTitle: '',
    items: [
      { name: 'next_list', value: '下一步', task_key: '0' },
      { name: 'delegation_list', value: '委托',task_key: '1' },// checked: 'true', 
      { name: 'plan_list', value: '计划', task_key: '2' },
      { name: 'calendar_list', value: '日程表', task_key: '3' },
      { name: 'someday_list', value: '将来某天', task_key: '4' },
      { name: 'reference_list', value: '参考', task_key: '5' },
    ],
    //滑动菜单
    isPopping: true,//是否已经弹出
    animPlus: {},//旋转动画
    animCollect: {},//item位移,透明度
    animTranspond: {},//item位移,透明度
    animInput: {},//item位移,透明度

  },
  // handleClick() {
  //   const addCurrent = this.data.current + 1;
  //   const current = addCurrent > 2 ? 0 : addCurrent;
  //   this.setData({
  //     'current': current
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { //副页面
    wx.showLoading({
      title: '正在加载数据',
      mask: true

    })
    
    console.log(options.collectionName)
    console.log(options.taskIndex)
    let listTitle = ''
    switch (options.collectionName){
      case 'next_list': listTitle = '下一步'
        break
      case 'delegation_list': listTitle = '委托'
        break
      case 'someday_list': listTitle = '将来某天'
        break
      case 'reference_list': listTitle = '参考'
        break
      default: '错误'
    }
    this.setData({
      collectionName: options.collectionName,
      taskIndex: options.taskIndex,
      listTitle
    })


    
    //从数据库获得数据 向云函数传递head, tail 
    if (this.data.collectionName === "plan_list"){
      wx.cloud.callFunction({
        name: 'detail_getData',
        data: {
          //date
          collectionName: this.data.collectionName,
          taskIndex: this.data.taskIndex
        }
      }).then(
        (res) => {

          console.log(res.result)
          let taskDetail = res.result
          if (taskDetail.taskSteps === undefined) {
            taskDetail.taskSteps = []
          }
          console.log(taskDetail.taskSteps.length)
          let steps = []
          for (let i = 0; i < taskDetail.taskSteps.length;i++){
            steps[i] = { value: '', disable: 'true', status: true, textDecoration: 'none',isFinish: null,flags: "1",buttonText: "完成",}
            steps[i].value = taskDetail.taskSteps[i].task
            //console.log(taskDetail.taskSteps[i].isFinish)
            steps[i].isFinish = taskDetail.taskSteps[i].isFinish
            if (taskDetail.taskSteps[i].isFinish == true){
              //steps[i].status = true
              //steps[i].textDecoration = "line-through"//文字中划线
              steps[i].flags = "0"
              steps[i].buttonText = "取消"//改变按钮文字
              

            }
            else{
              //steps[i].status = false
              //steps[i].textDecoration = "none"//文字中划线
              steps[i].flags = "1"
              steps[i].buttonText = "完成"//改变按钮文字
            }
          }

          
          this.setData({
            task: taskDetail.task,
            startDate: taskDetail.startDate,
            endDate: taskDetail.endDate,
            steps: steps,

          })
         
          wx.hideLoading()
          // wx.showToast({
          //   title: '加载数据中',
          //   icon: 'none'
          // })
        },
        (err) => {
          wx.hideLoading()
          wx.showToast({
            title: '加载数据失败,请检查您的网络',
            icon: 'none'
          })
          console.log(err)
        }
      )
    }
    else{
      wx.cloud.callFunction({
        name: 'detail_getData',
        data: {
          //date
          collectionName: this.data.collectionName,
          taskIndex: this.data.taskIndex
        }
      }).then(
        (res) => {

         
          console.log(res.result)
          let taskDetail = res.result
          
          this.setData({
            task: taskDetail.task,
            addDate: taskDetail.addDate,
            // endDate: taskDetail.endDate,
            // steps: steps,

          })

          wx.hideLoading()
        },
        (err) => {
          wx.hideLoading()
          wx.showToast({
            title: '加载数据失败,请检查您的网络',
            icon: 'none'
          })
          console.log(err)
        }
      )

    }

  },
  // otherData: {
  //   collectionIndex: 0,
  //   taskIndex: 0
  // },

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

  },
  touchS(e) {
    // 获得起始坐标
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
    //console.log(e.currentTarget.dataset.index)
    
  }, 
  touchM(e) {
    // 获得当前坐标
    this.currentX = e.touches[0].clientX;
    this.currentY = e.touches[0].clientY;
    const x = this.startX - this.currentX; //横向移动距离
    const y = Math.abs(this.startY - this.currentY); //纵向移动距离，若向左移动有点倾斜也可以接受
    let stepIndex = e.currentTarget.dataset.index;
    let steps = this.data.steps
    
    if (x > 35 && y < 110) {
      steps[stepIndex].status = false//取反
      //向左滑是显示删除
      this.setData({
        steps
      })
      
    } else if (x < -35 && y < 110) {
      //向右滑
      steps[stepIndex].status = true//取反
      //向左滑是显示删除
      this.setData({
        steps
      })
    }
  },
  taskEdit(){       //点击编辑图标修改事件名称
    this.setData({
      editDisable: false,
      focus: true,
      
    })
  },
  taskDelete(){
    this.setData({
      showDeleteDialog: true,

    })

  },
  onDeleteCancel(){
    this.setData({
      showDeleteDialog: false,

    })

  },
  onDeleteConfirm(){
    //数据库中tasks数组各个元素的索引与页面中tasks数组索引相同 但要保证数据库成功更新才更新页面
    wx.cloud.callFunction({
      name: 'detail_deletePlan',
      data: {
        planFlags: "allDlete",
        collectionName: this.data.collectionName,
        taskIndex: this.data.taskIndex,
        // deleteStepIndex: stepIndex
      }
    }).then(
      (res) => {
       

        wx.hideLoading()
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        wx.switchTab({
          url: '../arrange/arrange'
        })

      },
      (err) => {
        wx.hideLoading()
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 2000
        })
      }
    )

  },
  titleEdit(e){     //事件输入框失去焦点编辑完成写入数据
    this.setData({
      task: e.detail.value,
      editDisable: true,
      
    })
    //console.log(this.data.task)
    //调用云函数 改变事件名
    wx.cloud.callFunction({
      name: 'detail_alter',
      data: {
        eventFlags: "title",
        collectionName: this.data.collectionName,
        taskIndex: this.data.taskIndex,
       // stepIndex: stepIndex,
        task: e.detail.value,
      }
    }).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )

  },
  lostFocus(e) {   ////步骤输入框失去焦点编辑完成写入数据
    let stepIndex = e.currentTarget.dataset.index;
    let step = this.data.steps
    var value = "steps[" + stepIndex + "].value";
    var diable = "steps[" + stepIndex + "].disable";
    this.setData({
      [value]: e.detail.value,
      [diable]: true,
    })
    console.log(step[stepIndex])


    //调用云函数 向数据库中添加事件
    let currentTime = new Date().getTime()
    let addDate = moment().format('YYYY-MM-DD')
    wx.cloud.callFunction({
      name: 'detail_addPlan',
      data: {
        collectionName: this.data.collectionName,
        taskIndex: this.data.taskIndex,
        task: this.data.steps[stepIndex].value,
        taskId: currentTime,
        
        stepIndex: stepIndex,
        addDate: addDate
      }
    }).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )

  },
  onPickPlanStartDate(event){
    //console.log(event.detail)
    this.setData({
      startDate: event.detail.value,
    })
    //向云函数传递开始日期数据，修改数据库日期
    wx.cloud.callFunction({
      name: 'detail_alter',
      data: {
        eventFlags: "startDate",
        collectionName: this.data.collectionName,
        taskIndex: this.data.taskIndex,
        // stepIndex: stepIndex,
        startDate: this.data.startDate,
      }
    }).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )

  },
  onPickPlanEndDate(event) {
    //console.log(event.detail)
    this.setData({
      endDate: event.detail.value,
    })
    //向云函数传递结束日期数据，修改数据库日期
    wx.cloud.callFunction({
      name: 'detail_alter',
      data: {
        eventFlags: "endDate",
        collectionName: this.data.collectionName,
        taskIndex: this.data.taskIndex,
        // stepIndex: stepIndex,
        endDate: this.data.endDate,
      }
    }).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )

  },
  addTask(){    //添加一项小计划
    let step = this.data.steps
    var value = "steps[" + step.length + "].value";//封装数组
    var diable = "steps[" + step.length + "].disable";
    var status = "steps[" + step.length + "].status";
    var isFinish = "steps[" + step.length + "].isFinish";
    var buttonText = "steps[" + step.length + "].buttonText";
    var flags = "steps[" + step.length + "].flags";
    this.setData({
      [value]: "",
      [diable]: false,
      [status]: true,
      [isFinish]: false,
      [flags]: "1",
      [buttonText]: "完成",
    })
    
  },
  completeTask(e){  //完成步骤
    let stepIndex = e.currentTarget.dataset.index1;
    let flag = this.data.steps[stepIndex].flags
    let step = this.data.steps
    let allComplete = 0
    var status = "steps[" + stepIndex + "].status";
    var isFinish = "steps[" + stepIndex + "].isFinish";
    var flags = "steps[" + stepIndex + "].flags";
    var buttonText = "steps[" + stepIndex + "].buttonText";
    //let buttonText = this.data.buttonText
    // this.setData({
    //   [status]: true,
    //   [textDecoration]: "line-through",
      
    // })
    if( flag == 1){
      
      this.setData({
        [status]: true,
       // [textDecoration]: "line-through",//文字中划线
        [isFinish]: true,
        [flags]: "0",
        [buttonText]: "取消",//改变按钮文字
      })
      //console.log(e)

      //调用云函数 改变小步骤的完成情况
      wx.cloud.callFunction({
        name: 'detail_alter',
        data: {
          eventFlags: "littlePlan",
          collectionName: this.data.collectionName,
          taskIndex: this.data.taskIndex,
          stepIndex: stepIndex
         
        }
      }).then(
        (res) => {
          console.log(res)
          
         
          for (let i = 0; i < step.length; i++) {
            if (step[i].isFinish) {
              allComplete = allComplete + 1

            }
          }
          if (allComplete === step.length) {
            this.setData({
              showCompleteDialog: true

            })
          }
          else{
            if (this.data.steps[stepIndex].isFinish) {

              wx.hideLoading()
              wx.showToast({
                title: '该步骤完成',
                icon: 'success',
                duration: 2000
              })

            }
            
          }
          
        },
        (err) => {
          console.log(err)
        }
      )
    }
    else{
      
      this.setData({
        [status]: true,
       // [textDecoration]: "none",
       [isFinish]: false,
        [flags]: "1",
        [buttonText]: "完成",
      })
      //console.log(e)
      //调用云函数 改变小步骤的完成情况
      wx.cloud.callFunction({
        name: 'detail_alter',
        data: {
          eventFlags: "littlePlan",
          collectionName: this.data.collectionName,
          taskIndex: this.data.taskIndex,
          stepIndex: stepIndex

        }
      }).then(
        (res) => {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '取消完成',
            icon: 'success',
            duration: 2000
          })
        },
        (err) => {
          console.log(err)
        }
      )
    }

  },
  onCompleteConfirm() {
    wx.cloud.callFunction({
      name: 'detail_alter',
      data: {
        eventFlags: "planComplete",
        collectionName: this.data.collectionName,
        taskIndex: this.data.taskIndex,
        

      }
    }).then(
      (res) => {
        console.log(res)
        
          wx.hideLoading()
          wx.showToast({
            title: '该计划完成',
            icon: 'success',
            duration: 2000
          })
        wx.switchTab({
          url: '../arrange/arrange'
        })

        


      },
      (err) => {
        console.log(err)
      }
    )

  },
  onCompleteCancel(){
    this.setData({
      showCompleteDialog: false

    })
  },
  otherComplete(){
    //调用云函数 改变任务的完成情况
    wx.cloud.callFunction({
      name: 'detail_alter',
      data: {
        eventFlags: "otherTask",
        collectionName: this.data.collectionName,
        taskIndex: this.data.taskIndex,
        // stepIndex: stepIndex

      }
    }).then(
      (res) => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '事件完成',
          icon: 'success',
          duration: 2000
        })
        wx.switchTab({
          url: '../arrange/arrange'
        })
      },
      (err) => {
        console.log(err)
      }
    )
  

  },
  goTask(e){   //点击转到弹出选择框
    
    if(this.data.collectionName === "plan_list"){
      let stepIndex = e.currentTarget.dataset.index2;//获取该项步骤的索引
      this.setData({
        showDialog: !this.data.showDialog,//弹框
        goIndex: stepIndex
      });
      console.log(stepIndex)
    }
    else{
      this.setData({
        showDialog: !this.data.showDialog,//弹框
        goIndex: this.data.taskIndex
      });
    }


  },
  
  deleteTask(e){ //删除小步骤
    let stepIndex = e.currentTarget.dataset.index3;
    let step = this.data.steps
    // for ( var i = 0; i < step.length; i++){
    //   if (i == stepIndex) {
    //     step.splice(i--, 1);
    //     this.setData({
    //       steps: step
    //     })
    //     return true;
    //   }
    
    // }


    //数据库中tasks数组各个元素的索引与页面中tasks数组索引相同 但要保证数据库成功更新才更新页面
    wx.cloud.callFunction({
      name: 'detail_deletePlan',
      data: {
        planFlags: "littleFlags",
        collectionName: this.data.collectionName,
        taskIndex: this.data.taskIndex,
        deleteStepIndex: stepIndex
      }
    }).then(
      (res) => {
				step.splice(stepIndex, 1);
            this.setData({
              steps: step
            })

        wx.hideLoading()
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
      },
      (err) => {
        wx.hideLoading()
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 2000
        })
      }
    )
  },
  otherDelete(){
    //数据库中tasks数组各个元素的索引与页面中tasks数组索引相同 但要保证数据库成功更新才更新页面
    wx.cloud.callFunction({
      name: 'detail_deletePlan',
      data: {
        collectionName: this.data.collectionName,
        taskIndex: this.data.taskIndex,
        // deleteStepIndex: stepIndex
      }
    }).then(
      (res) => {
        // for (var i = 0; i < step.length; i++) {
        //   if (i == stepIndex) {
        //     step.splice(i--, 1);
        //     this.setData({
        //       steps: step
        //     })
        //     return true;
        //   }

        // }

        wx.hideLoading()
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        wx.switchTab({
          url: '../arrange/arrange'
        })
       
      },
      (err) => {
        wx.hideLoading()
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 2000
        })
      }
    )

  },

  toggleDialog() { //弹窗
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C','d','f','g'],
    //   success: function (res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  toggleDate(){
    this.setData({
      showDate: !this.data.showDate,
      itemId: null
    });

  },
  abolishDateButton() {
    
    this.setData({
      showDate: !this.data.showDate,
      itemId: null
    });
  },
  abolishButton(){
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  appointButton() {
    console.log(this.data.goIndex)
    let itemId = this.data.itemId

    //调用云函数 将小步骤添加到其他计划中
    if (itemId != 2 && itemId != 3){
      if(this.data.collectionName == "plan_list"){
        wx.cloud.callFunction({
          name: 'detail_goPlan',
          data: {
            eventFlags: "goLittlePlan",
            collectionName: this.data.collectionName,
            taskIndex: this.data.taskIndex,
            stepIndex: this.data.goIndex,//小步骤的索引
            goTaskItem: this.data.goTaskItem,//要转到的集合名

          }
        }).then(
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
      }
      else{
        wx.cloud.callFunction({
          name: 'detail_goPlan',
          data: {
            eventFlags: "goOtherTask",
            collectionName: this.data.collectionName,
            taskIndex: this.data.taskIndex,
            //stepIndex: this.data.goIndex,
            goTaskItem: this.data.goTaskItem,

          }
        }).then(
          (res) => {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '转到成功',
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              url: '../arrange/arrange'
            })
          },
          (err) => {
            console.log(err)
          }
        )

      }
      this.setData({
        itemId: null

        })
    }
    else{
      
      let today = utils.formatNow()
      this.setData({
        showDate: !this.data.showDate,
        planStartDate: today,
        planEndDate:  today,
        calendarDate: today
      });
     }
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  goPlanStartDate(event){
    this.setData({
      planStartDate: event.detail.value,
    })

  },
  goPlanEndDate(event) {
    this.setData({
      planEndDate: event.detail.value,
    })

  },
  goCalendarDate(event) {
    this.setData({
      calendarDate: event.detail.value,
    })

  },
  appointDateButton() {
    console.log(this.data.goIndex)
    let itemId = this.data.itemId

    //调用云函数 将小步骤添加到其他计划中
    if (itemId == 2) {
      if(this.data.collectionName == "plan_list"){
        wx.cloud.callFunction({
          name: 'detail_goPlan',
          data: {
            eventFlags: "goLittlePlan",
            collectionName: this.data.collectionName,
            taskIndex: this.data.taskIndex,
            stepIndex: this.data.goIndex,
            goTaskItem: this.data.goTaskItem,
            planStartDate: this.data.planStartDate,
            planEndDate: this.data.planEndDate,

          }
        }).then(
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
      }
      else{
        wx.cloud.callFunction({
          name: 'detail_goPlan',
          data: {
            eventFlags: "goOtherTask",
            collectionName: this.data.collectionName,
            taskIndex: this.data.taskIndex,
            stepIndex: this.data.goIndex,
            goTaskItem: this.data.goTaskItem,
            planStartDate: this.data.planStartDate,
            planEndDate: this.data.planEndDate,

          }
        }).then(
          (res) => {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '转到成功',
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              url: '../arrange/arrange'
            })
          },
          (err) => {
            console.log(err)
          }
        )

      }
      this.setData({
        showDate: !this.data.showDate,
        
      });
     
    }
    else if (itemId == 3) {
      if (this.data.collectionName == "plan_list") {

        wx.cloud.callFunction({
          name: 'detail_goPlan',
          data: {
            eventFlags: "goLittlePlan",
            collectionName: this.data.collectionName,
            taskIndex: this.data.taskIndex,
            stepIndex: this.data.goIndex,
            goTaskItem: this.data.goTaskItem,
          calendarDate: this.data.calendarDate

          }
        }).then(
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
      }
      else{
        wx.cloud.callFunction({
          name: 'detail_goPlan',
          data: {
            eventFlags: "goOtherTask",
            collectionName: this.data.collectionName,
            taskIndex: this.data.taskIndex,
            stepIndex: this.data.goIdex,
            goTaskItem: this.data.goTaskItem,
            calendarDate: this.data.calendarDate

          }
        }).then(
          (res) => {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '转到成功',
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              url: '../arrange/arrange'
            })
          },
          (err) => {
            console.log(err)
          }
        )

      }
      
    }
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      goTaskItem: e.detail.value
    })
  },
  radio(e){
    console.log(e.currentTarget.dataset.id) //获取添加到选择按钮的id
    this.setData({
      itemId: e.currentTarget.dataset.id
    })
  },
  


  //点击弹出
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },
  input: function () {
    console.log("input")
  },
  transpond: function () {
    console.log("transpond")
  },
  collect: function () {
    console.log("collect")
  },

  //弹出动画
  popp: function () {
    //plus顺时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(180).step();
    animationcollect.translate(-75, -75).rotateZ(360).opacity(1).step();
    animationTranspond.translate(-106, 0).rotateZ(360).opacity(1).step();
    animationInput.translate(-75, 75).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
  //收回动画
  takeback: function () {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },

})