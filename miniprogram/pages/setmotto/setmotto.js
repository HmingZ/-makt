// pages/setmotto/setmotto.js

const app = getApp()
const db = wx.cloud.database()

Page({


  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    value: '',
    list: [],
    dataId:'',
    placeholder:'设定属于你自己的motto',

  },

//获取文本框信息
  getvalue:function(e){
    console.log(e)

    this.setData({
      value: e.detail.value,
      
    })
    console.log(this.data)


  },


//获取信息
  getMotto() {
    var that = this
    db.collection('mottolist').get({
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data,
          placeholder: res.data[0].motto,
          dataId: res.data[0]._id,
        })
      }
    })
  },




//设置座右铭
  setMottoDetail: function (e) {
    console.log(e)
    var that = this
    var id = e.target.dataset.id
    
    if(id){
      wx.showToast({
        title: '设置中……',
        icon: 'loading',
        mask: true
      })
      db.collection('mottolist').doc(id).update({
        data:{
          motto: that.data.value,
        },
        success: function (res) {
          wx.hideToast()
          that.setData({
            value: ""
          })
          console.log('[数据库] [更改记录] 成功，记录——res: ', res)
          wx.navigateBack({
            delta: 1
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '更改记录失败'
          })
          console.error('[数据库] [更改记录] 失败：', err)
        }
      })
    }

    else {
      wx.showToast({
        title: '设置中……',
        icon: 'loading',
        mask: true
      })
      db.collection('mottolist').add({
        data: {
          motto: that.data.value,
        },
        success: function (res) {
          wx.hideToast()
          that.setData({
            value: ""
          })
          console.log('[数据库] [新增记录] 成功，记录 _res: ', res)
          wx.navigateBack({
            delta: 1
          })
        },

        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }



      })

    }

  },

  CancelTap: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.openid){
      this.setData({
        openid: app.globalData.openid
      })
    }


    var that = this
    that.getMotto()

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
    wx.hideToast()

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