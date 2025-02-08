const app = getApp()

Page({
  data: {
    isLogin: false,
    userInfo: null,
    favorites: [],
    history: [],
    ratings: {}
  },

  onLoad: function() {
    this.updateUserData()
  },

  onShow: function() {
    this.updateUserData()
  },

  // 更新用户数据
  updateUserData: function() {
    this.setData({
      isLogin: app.globalData.isLogin,
      userInfo: app.globalData.userInfo,
      favorites: app.globalData.favorites,
      history: app.globalData.history,
      ratings: app.globalData.ratings
    })
  },

  // 处理登录
  handleLogin: async function() {
    try {
      const userInfo = await app.login()
      this.setData({
        isLogin: true,
        userInfo: userInfo
      })
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
    } catch (err) {
      wx.showToast({
        title: '登录失败',
        icon: 'error'
      })
    }
  },

  // 导航到收藏页面
  navigateToFavorites: function() {
    if (!this.data.isLogin) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/favorites/favorites'
    })
  },

  // 导航到历史记录页面
  navigateToHistory: function() {
    if (!this.data.isLogin) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/history/history'
    })
  },

  // 导航到评分页面
  navigateToRatings: function() {
    if (!this.data.isLogin) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/ratings/ratings'
    })
  },

  // 处理主题设置
  handleThemeSetting: function() {
    wx.showActionSheet({
      itemList: ['浅色模式', '深色模式'],
      success: (res) => {
        // TODO: 实现主题切换逻辑
        wx.showToast({
          title: '即将支持',
          icon: 'none'
        })
      }
    })
  },

  // 处理清除缓存
  handleClearCache: function() {
    wx.showModal({
      title: '提示',
      content: '确定要清除缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorage()
          wx.showToast({
            title: '清除成功',
            icon: 'success'
          })
          this.updateUserData()
        }
      }
    })
  },

  // 处理关于我们
  handleAbout: function() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  }
}) 