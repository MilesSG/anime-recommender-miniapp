const { animeData } = require('../../data/anime.js')

Page({
  data: {
    currentCategory: '全部',
    searchKeyword: '',
    displayAnimeList: [],
    allAnimeList: []
  },

  onLoad: function() {
    // 合并所有动漫数据
    const allAnime = [
      ...animeData.hotAnime,
      ...animeData.newAnime,
      ...animeData.completedAnime
    ]
    this.setData({
      allAnimeList: allAnime,
      displayAnimeList: allAnime
    })
  },

  // 搜索功能
  onSearch: function(e) {
    const keyword = e.detail.value.toLowerCase()
    this.setData({ searchKeyword: keyword })
    this.filterAnime()
  },

  // 切换分类
  changeCategory: function(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ currentCategory: category })
    this.filterAnime()
  },

  // 过滤动漫列表
  filterAnime: function() {
    let filteredList = this.data.allAnimeList

    // 按分类过滤
    if (this.data.currentCategory !== '全部') {
      filteredList = filteredList.filter(anime => 
        anime.category === this.data.currentCategory
      )
    }

    // 按关键词搜索
    if (this.data.searchKeyword) {
      filteredList = filteredList.filter(anime =>
        anime.title.toLowerCase().includes(this.data.searchKeyword)
      )
    }

    this.setData({ displayAnimeList: filteredList })
  },

  // 跳转到详情页
  goToDetail: function(e) {
    const animeId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${animeId}`
    })
  }
}) 