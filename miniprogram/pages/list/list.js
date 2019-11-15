const app = getApp();
Page({
  data: {
    postsList: [],
    isLastPage: false,
    page: 0,
    tagname: "",
    tagid: ""
  },
  onLoad: function(opt) {
    this.setData({
      tagid: opt.id
    })
    wx.cloud.callFunction({
      name: 'gettags',
      data: {
        "id": opt.id
      }
    }).then(res => {
      let name = res.result.data[0].name
      // console.log(res.result);
      wx.setNavigationBarTitle({
        title: name,
        success: res => {
          this.setData({
            tagname: name
          })
        }
      });
      wx.hideLoading();
    })
    this.fetchPostsData();
  },
  onPullDownRefresh: function() {
    var self = this;
    self.setData({
      isLastPage: false,
      page: 0,
      postsList: []
    });
    this.fetchPostsData();
    wx.stopPullDownRefresh();
  },
  //上拉加载更多
  onReachBottom: function() {
    var self = this;
    if (!self.data.isLastPage) {
      self.setData({
        page: self.data.page + 4
      });
      console.log('当前页' + self.data.page);
      this.fetchPostsData();
    } else {
      console.log('最后一页');
    }

  },
  //跳转至查看文章详情
  redictDetail: function(e) {
    //console.log(e.currentTarget.id);
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },
  fetchPostsData() {
    wx.showLoading({
      title: '正在加载',
      mask: true
    });
    wx.cloud.callFunction({
      name: 'getPosts',
      data: {
        nowpage: this.data.page,
        tagid: this.data.tagid
      }
    }).then(res => {
      console.log(res.result);
      if (res.result.data.length == 0 || res.result.data.length < 4) {
        this.setData({
          isLastPage: true
        });
      }
      this.setData({
        postsList: this.data.postsList.concat(res.result.data),
        displaySwiper: "block"
      })
      wx.hideLoading();
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})