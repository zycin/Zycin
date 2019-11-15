// miniprogram/pages/about/about.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: '1',
    showerror: "none",
    shownodata: "none",
    subscription: "",
    userInfo: { avatarUrl: "../../images/gravatar.png", nickName:"点我登录"},
    openid: '',
    isLoginPopup: false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.setNavigationBarTitle({
      title: '关于我的',
      success: function (res) {
        // success
      }
    });
    if (!wx.cloud) {
      wx.showToast({
        title: '你的微信版本过低！',
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
                userInfo: res.userInfo,
                isLoginPopup: true
              })
            }
          })
        }
      }
    });
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        // console.log(app.globalData.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.isLoginPopup && e.detail.userInfo) {
      this.setData({
        isLoginPopup: true,
        userInfo: e.detail.userInfo
      })
    } 
  },
  onReady: function () {
   
  },


  // 清除缓存
  clearStorage: function (e) {
    wx.reLaunch({
      url: '../index/index'
    })
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