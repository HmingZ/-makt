
const app = getApp()
const db =  wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    setMottoUrl: './setmotto.png',
    userInfo: {},
    logged: false,
    value: '',
    list:[],
    takeSession: false,
    requestResult: ''
    
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('login user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        
      },
      fail: err => {
        console.error('login 调用失败', err)
      }
    })



    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }




      // 获取用户信息
      
    wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo
                })
              }
            })
          }
          else{
            wx.showModal({
              title: '提示',
              content: '用户未授权，可点击头像进行授权',
              success: function (res) {
                if (res.confirm) {
                  console.log('确定')
                } else {
                  console.log('取消')
                }

              }
            })
          }
        }
      })
  
  },


  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },


  setMotto:function(e){
    wx.showToast({
      title: '加载中……',
      icon: 'loading',
      mask: true
    })
    wx.navigateTo({
      
      url: "../setmotto/setmotto",
    })

  },


  getMotto() {
    var that = this
    db.collection('mottolist').get({
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data
        })
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
    var that = this
    that.getMotto()
    
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
    that.getMotto();
    
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
