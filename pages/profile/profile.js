const app = getApp()

Page({
  data: {
    isLogin: false,
    userInfo: null,
    favorites: [],
    history: [],
    ratings: {},
    // 喜欢的类型
    preferredGenres: [
      { genre: '热血', count: 28 },
      { genre: '奇幻', count: 24 },
      { genre: '冒险', count: 20 },
      { genre: '科幻', count: 18 },
      { genre: '日常', count: 15 }
    ],
    // 常见标签
    preferredTags: [
      { tag: '热血', weight: 32, color: '#ff6b81' },
      { tag: '战斗', weight: 28, color: '#ff9b9b' },
      { tag: '成长', weight: 26, color: '#ffd93d' },
      { tag: '励志', weight: 24, color: '#4ecdc4' },
      { tag: '友情', weight: 22, color: '#45b7d1' },
      { tag: '青春', weight: 20, color: '#96ceb4' }
    ],
    // 观看习惯
    viewingHabits: [
      { title: '平均追番数', value: '12部/月' },
      { title: '日均观看', value: '2.5小时' },
      { title: '最爱时段', value: '20:00-22:00' },
      { title: '总观看时长', value: '1680小时' }
    ],
    timeDistribution: [
      { hour: '6', percentage: 45 },
      { hour: '9', percentage: 30 },
      { hour: '12', percentage: 25 },
      { hour: '15', percentage: 60 },
      { hour: '18', percentage: 85 },
      { hour: '21', percentage: 95 },
      { hour: '24', percentage: 70 }
    ],
    // 推荐列表
    recommendations: [
      {
        title: '咒术回战 第二季',
        coverUrl: '/assets/images/anime/jujutsu.jpg',
        match: 98,
        tags: '热血 战斗'
      },
      {
        title: '地缚少年花子君 第二季',
        coverUrl: '/assets/images/anime/hanako.jpg',
        match: 95,
        tags: '奇幻 悬疑'
      },
      {
        title: '间谍过家家 第二季',
        coverUrl: '/assets/images/anime/spy.jpg',
        match: 92,
        tags: '喜剧 冒险'
      }
    ]
  },

  onLoad: function() {
    this.updateUserData();
    this.processChartData();
  },

  processChartData: function() {
    const maxPercentage = Math.max(...this.data.timeDistribution.map(item => item.percentage));
    const minPercentage = Math.min(...this.data.timeDistribution.map(item => item.percentage));
    
    const updatedDistribution = this.data.timeDistribution.map((item, index) => ({
      ...item,
      // 计算相对高度，使数据点位置更合理
      bottom: ((item.percentage - minPercentage) / (maxPercentage - minPercentage)) * 80 + '%'
    }));

    this.setData({
      timeDistribution: updatedDistribution
    });
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