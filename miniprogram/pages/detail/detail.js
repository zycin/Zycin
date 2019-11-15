const app = getApp();
Page({
  data: {
    //article将用来存储towxml数据
    article: {},
    title: "",
    id: ""
  },
  onLoad: function(opt) {
    const _ts = this;
    this.setData({id: opt.id})
    wx.cloud.callFunction({
      name: 'getdetail',
      data: {
        id: opt.id
      }
    }).then(res => {
      console.log(res)
      const url = res.result[0].tempFileURL;
      const title = res.result[1].title;
      
      wx.setNavigationBarTitle({
        title: title,
        success: res => {
        }
      });
      wx.showLoading({
        title: '正在加载',
        mask: true
      });
      // get temp file URL
      //请求markdown文件，并转换为内容
      wx.request({
        url: url,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          //将markdown内容转换为towxml数据
          let data = app.towxml.toJson(
            res.data, // `markdown`或`html`文本内容
            'markdown' // `markdown`或`html`
          );

          //前台初始化小程序数据（2.1.2新增，如果小程序中无相对资源需要添加`base`根地址，也无`audio`内容可无需初始化）
          data = app.towxml.initData(data, {
            base: '', // 需要解析的内容中相对路径的资源`base`地址
            app: _ts // 传入小程序页面的`this`对象，以用于音频播放器初始化
          });

          //设置文档显示主题，默认'light'
          data.theme = 'light';
          data.child.splice(0,4);
          console.log(data);
          //设置数据  
          _ts.setData({
            article: data,
            title: title
          });
          wx.hideLoading();
        }
      });
      
    })

  },
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.title,
      path: '/pages/detail/detail?id='+this.data.id
    }
  },

})