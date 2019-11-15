//pages/index.js
const app = getApp();
Page({
  data: {
    postsList: [],
    postsShowSwiperList: [],
    isLastPage: false,
    page: 0,
    search: '',
    categories: 0,
    showCategoryName: "",
    categoryName: "",
    displaySwiper: "none",
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: "Zycin | GeekBlog",
      success: res => {
      }
    });
    this.fetchPostsData();
  },
  onPullDownRefresh: function () {
    var self = this;
    self.setData({
      displaySwiper: "none",
      isLastPage: false,
      page: 0,
      postsList:[],
      postsShowSwiperList: []
    });
    this.fetchPostsData();
    wx.stopPullDownRefresh();
  },
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Zycin | GeekBlog',
      path: '/pages/index/index'
    }
  },
  //上拉加载更多
  onReachBottom: function () {
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
  redictDetail: function (e) {
    //console.log(e.currentTarget.id);
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },
  fetchPostsData () {
    wx.showLoading({
      title: '正在加载',
      mask: true
    });
    wx.cloud.callFunction({
      name: 'getPosts',
      data: {
        nowpage: this.data.page,
        tagid: ""
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
  }
})