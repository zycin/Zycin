// miniprogram/pages/tags/tags.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoriesList: {},
    floatDisplay: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '标签',
      success: function (res) {
        // success
      }
    });
    this.fetchCategoriesData();
  },

  fetchCategoriesData(){
    wx.showLoading({
      title: '正在加载',
      mask: true
    });
    wx.cloud.callFunction({
      name: 'gettags',
      data: {
        "id":""
      }
    }).then(res => {
      console.log(res.result);
      this.setData({
        categoriesList: res.result.data,
        floatDisplay: "block"
      })
      wx.hideLoading();
    })
  },
  //跳转至某分类下的文章列表
  redictIndex: function (e) {
    // console.log(e.currentTarget.dataset.id);  
    let id = e.currentTarget.dataset.id;
    let url = '../list/list?id=' + id;
    wx.navigateTo({
      url: url
    });
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