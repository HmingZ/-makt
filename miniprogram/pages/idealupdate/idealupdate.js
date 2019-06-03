// pages/idealupdate/idealupdate.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ideallist:[],
    idealName: '',
    beginDate: '',
    beginTime: '',
    endDate: '',
    endTime: '',
    bImage: '',

  },


  getdetail() {
    var that = this
    db.collection('ideallist').doc(app.globalData.j).get({
      success: function (res) {
        console.log(res)
        that.setData({
          idealName: res.data.idealName,
          beginDate: res.data.beginDate,
          beginTime: res.data.beginTime,
          endDate: res.data.endDate,
          endTime: res.data.endTime
        })
      }
    })
  },








  idealName: function (e) {
    var that = this
    console.log(e)
    console.log(e.detail.value)
    that.setData({
      idealName: e.detail.value

    })

  },
  beginDate: function (e) {
    var that = this
    console.log(e)
    console.log(e.detail.value)
    that.setData({
      beginDate: e.detail.value

    })

  },
  beginTime: function (e) {
    var that = this
    console.log(e)
    console.log(e.detail.value)
    that.setData({
      beginTime: e.detail.value

    })
  },
  endDate: function (e) {
    var that = this
    console.log(e)
    console.log(e.detail.value)
    that.setData({
      endDate: e.detail.value

    })
  },
  endTime: function (e) {
    var that = this
    console.log(e)
    console.log(e.detail.value)
    that.setData({
      endTime: e.detail.value

    })
  },

  SaveTap: function (e) {
    console.log(e)
    var a = e.target.dataset.ideal
    var b = e.target.dataset.begindate
    var c = e.target.dataset.begintime
    var d = e.target.dataset.enddate
    var e = e.target.dataset.endtime
    if (a && b && c && d && e)  /*判定每一项不为空*/ {
      var that = this
      console.log(that.data.idealName)
      wx.showToast({
        title: '更改中……',
        icon: 'loading',
        mask: true
      })
      db.collection('ideallist').doc(app.globalData.j).update({
        data: {
          idealName: that.data.idealName,
          beginDate: that.data.beginDate,
          beginTime: that.data.beginTime,
          endDate: that.data.endDate,
          endTime: that.data.endTime
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
      wx.showModal({
        title: '未填写完全',
        content: '是否重新填写我( ^ ω ^ )',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            wx.navigateBack({
              delta: 2
            })
          }

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
    var i = app.globalData.j
    console.log('需要更改的——id为：')
    console.log(i)

    var that = this
    that.getdetail()

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