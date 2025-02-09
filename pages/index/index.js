const app = getApp()
const { animeData } = require('../../data/anime.js')

// 测试数据
const testAnimeList = [
  {
    id: 1,
    title: '进击的巨人 最终季',
    cover: 'https://cdn.myanimelist.net/images/anime/1948/120625.jpg',
    score: 9.1,
    category: '热门',
    status: '完结',
    description: '人类与巨人的最终决战，艾伦·耶格尔必须面对最终的抉择。'
  },
  {
    id: 2,
    title: '鬼灭之刃 刀匠村篇',
    cover: 'https://cdn.myanimelist.net/images/anime/1286/131754.jpg',
    score: 8.9,
    category: '热门',
    status: '连载中',
    description: '炭治郎一行人前往刀匠村，寻找最强大的武器来对抗强大的恶魔。'
  },
  {
    id: 3,
    title: '咒术回战 第二季',
    cover: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
    score: 9.0,
    category: '新番',
    status: '连载中',
    description: '五条悟的过去与宿傩的阴谋逐渐展开，咒术界面临前所未有的危机。'
  },
  {
    id: 4,
    title: '间谍过家家 第二季',
    cover: 'https://cdn.myanimelist.net/images/anime/1027/138900.jpg',
    score: 8.7,
    category: '新番',
    status: '连载中',
    description: '和平使者"黄昏"继续带领他的假想家庭执行任务，同时维护着温馨的家庭生活。'
  }
]

Page({
  data: {
    currentCategory: '为你推荐',
    displayAnimeList: [],
    loading: false,
    searchValue: '',
    defaultCover: 'https://pic.imgdb.cn/item/65bde0a9871b83018ac3e9c2.jpg',
    // 添加数据分析相关的数据
    analysisData: {
      totalWatchTime: 1680,
      totalAnime: 28,
      avgScore: 8.7,
      timeGrowth: 12.5,
      animeGrowth: 8.3,
      scoreGrowth: 0.5
    },
    // 观看类型偏好数据
    preferenceData: [
      { type: '热血', value: 35 },
      { type: '奇幻', value: 25 },
      { type: '战斗', value: 20 },
      { type: '冒险', value: 15 },
      { type: '悬疑', value: 5 }
    ],
    // 观看时段分布数据
    timeDistribution: [
      { time: '6时', value: 45 },
      { time: '9时', value: 30 },
      { time: '12时', value: 25 },
      { time: '15时', value: 60 },
      { time: '18时', value: 85 },
      { time: '21时', value: 95 },
      { time: '24时', value: 70 }
    ]
  },

  onLoad() {
    // 将所有分类的动漫合并到一个列表中
    const allAnime = [
      ...animeData.hotAnime,
      ...animeData.newAnime,
      ...animeData.completedAnime
    ]
    app.globalData.animeList = allAnime
    this.loadAnimeList()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  // 加载动漫列表
  loadAnimeList() {
    const animeList = app.globalData.animeList || []
    this.setData({
      displayAnimeList: this.filterAnimeList(animeList)
    })
  },

  // 根据分类和搜索词过滤动漫列表
  filterAnimeList(list) {
    return list.filter(item => {
      // 处理搜索
      const matchSearch = !this.data.searchValue || 
                         item.title.toLowerCase().includes(this.data.searchValue.toLowerCase())
      
      // 处理分类
      let matchCategory = true
      if (this.data.currentCategory === '为你推荐') {
        matchCategory = true // 显示所有动漫
      } else if (this.data.currentCategory === '热门') {
        matchCategory = item.category === '热门'
      } else if (this.data.currentCategory === '新番') {
        matchCategory = item.category === '新番'
      } else if (this.data.currentCategory === '完结') {
        matchCategory = item.category === '完结'
      }

      return matchCategory && matchSearch
    })
  },

  // 搜索处理
  onSearch(e) {
    this.setData({
      searchValue: e.detail.value
    }, () => {
      this.loadAnimeList()
    })
  },

  // 切换分类
  changeCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      currentCategory: category
    }, () => {
      this.loadAnimeList()
    })
  },

  // 图片加载错误处理
  onImageError(e) {
    const index = e.currentTarget.dataset.index
    const key = `displayAnimeList[${index}].cover`
    this.setData({
      [key]: this.data.defaultCover
    })
  },

  // 跳转到详情页
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  // 导航函数
  navigateToAnalytics() {
    wx.navigateTo({
      url: '/pages/analytics/index'
    })
  },

  navigateToTrends() {
    wx.navigateTo({
      url: '/pages/trends/index'
    })
  },

  navigateToRecommend() {
    wx.navigateTo({
      url: '/pages/recommend/index'
    })
  },

  navigateToProfile() {
    wx.switchTab({
      url: '/pages/profile/profile'
    })
  },

  showMore() {
    wx.showToast({
      title: '更多内容开发中',
      icon: 'none'
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadAnimeList()
    wx.stopPullDownRefresh()
  },

  // 触底加载更多
  onReachBottom() {
    // 预留加载更多功能
  }
}) 