App({
  onLaunch() {
    // 引入动漫数据
    const { animeData } = require('./data/anime.js')
    
    // 将所有类别的动漫数据合并到一个列表中
    this.globalData.animeList = [
      ...animeData.hotAnime,
      ...animeData.newAnime,
      ...animeData.completedAnime
    ]

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res
        this.globalData.statusBarHeight = res.statusBarHeight
      }
    })

    // 获取本地存储的用户数据
    const userInfo = wx.getStorageSync('userInfo')
    const favorites = wx.getStorageSync('favorites') || []
    const history = wx.getStorageSync('history') || []
    const ratings = wx.getStorageSync('ratings') || {}

    this.globalData.userInfo = userInfo
    this.globalData.isLogin = !!userInfo
    this.globalData.favorites = favorites
    this.globalData.history = history
    this.globalData.ratings = ratings
  },

  globalData: {
    userInfo: null,
    systemInfo: null,
    statusBarHeight: 0,
    isLogin: false,
    animeList: [], // 添加动漫列表
    favorites: [],
    history: [],
    ratings: {}
  },

  // 用户登录
  login: function() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {
          const userInfo = res.userInfo
          this.globalData.userInfo = userInfo
          this.globalData.isLogin = true
          wx.setStorageSync('userInfo', userInfo)
          resolve(userInfo)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  // 添加到收藏
  addToFavorites: function(anime) {
    const favorites = this.globalData.favorites
    if (!favorites.find(item => item.id === anime.id)) {
      favorites.push(anime)
      this.globalData.favorites = favorites
      wx.setStorageSync('favorites', favorites)
    }
  },

  // 从收藏中移除
  removeFromFavorites: function(animeId) {
    let favorites = this.globalData.favorites
    favorites = favorites.filter(item => item.id !== animeId)
    this.globalData.favorites = favorites
    wx.setStorageSync('favorites', favorites)
  },

  // 添加观看历史
  addToHistory: function(anime) {
    let history = this.globalData.history
    // 移除可能存在的重复记录
    history = history.filter(item => item.id !== anime.id)
    // 添加到历史记录开头
    history.unshift({
      ...anime,
      viewTime: new Date().getTime()
    })
    // 限制历史记录数量
    if (history.length > 100) {
      history = history.slice(0, 100)
    }
    this.globalData.history = history
    wx.setStorageSync('history', history)
  },

  // 添加评分
  addRating: function(animeId, score) {
    const ratings = this.globalData.ratings
    ratings[animeId] = {
      score,
      time: new Date().getTime()
    }
    this.globalData.ratings = ratings
    wx.setStorageSync('ratings', ratings)
  }
}) 