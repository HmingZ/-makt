// pages/ideal/ideal.js

const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ideallist:[],
    totalTime:[],
    deleteUrl:'../../images/deleteUrl.png',
    updateUrl:'../../images/updateUrl.png',
    idealCreateUrl:'../../images/idealCreateUrl.png',
    idealDeleteUrl: '../../images/idealDeleteUrl.png',
    imageUrl: 'https://wx3.sinaimg.cn/mw1024/007HBEWwly1g3kfq19azlj319b0u0nhg.jpg',
    updateid:'',
  },

  idealCreate:function(e){
    wx.showToast({
      title: '加载中……',
      icon: 'loading',
      mask: true
    })
    var that=this
    wx.navigateTo({
      url: "../idealdetail/idealdetail",
    })
  },



  getdetail() {
    var that = this
    db.collection('ideallist').orderBy('endDate', 'asc').get({
      success: function (res) {
        console.log(res)
        that.setData({
          ideallist: res.data,
          totalTime: res.data[0].endDate + ' ' + res.data[0].endTime

        })
      }
    })
  },


  idealDelete:function(e){
    var that=this
    console.log(e)
    console.log(e.target.dataset.id)
    wx.showModal({
      title: '提示',
      content: '真的扔掉我嘛♪(´ε｀ )',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '处理中……',
            icon: 'loading',
            mask:true
          })
          db.collection('ideallist').doc(e.currentTarget.dataset.id).remove({
            success: function (res) {
              that.getdetail()
              wx.hideToast()
              console.log('用户删除成功')
            }
          })
        } 
        else {
          console.log('用户点击取消')
        }

      }
    })
  },


  idealUpdate: function (e) {
    var that = this
    var updateid = e.target.dataset.id
    console.log(e.target.dataset.id)
    console.log(updateid)
    wx.showModal({
      title: '提示',
      content: '确定更改该选项嘛？T^T',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '加载中……',
            icon: 'loading',
            mask: true
          })
          console.log(updateid)
          app.globalData.j = updateid
          wx.navigateTo({
            url: '/pages/idealupdate/idealupdate',
          })
          
        } else {
          console.log('用户点击取消')
        }

      }
    })


  },





  /**
   * 显示删除按钮
   */
  showDeleteButton: function (e) {
    let idealIndex = e.currentTarget.dataset.idealIndex
    this.setXmove(idealIndex, -65)
  },

  /**
   * 隐藏删除按钮
   */
  hideDeleteButton: function (e) {
    let idealIndex = e.currentTarget.dataset.idealIndex

    this.setXmove(idealIndex, 0)
  },

  /**
   * 设置movable-view位移
   */
  setXmove: function (idealIndex, xmove) {
    let ideallist = this.data.ideallist
    ideallist[idealIndex].xmove = xmove

    this.setData({
      ideallist: ideallist
    })
  },

  /**
   * 处理movable-view移动事件
   */
  handleMovableChange: function (e) {
    if (e.detail.source === 'friction') {
      if (e.detail.x < -30) {
        this.showDeleteButton(e)
      } else {
        this.hideDeleteButton(e)
      }
    } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
      this.hideDeleteButton(e)
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
    
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('onShow user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid

      },
      fail: err => {
        console.error('onShow login调用失败', err)
      }
    })

    var that=this
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
    console.log("onPullDownRefresh");
    var that = this;
    that.getdetail();
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    

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