// pages/recommend/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    preferenceChart: null,
    currentCategory: '热血',
    // Mock数据
    recommendations: [
      {
        id: 1,
        title: '咒术回战 第二季',
        cover: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
        matchRate: 98,
        category: '热血',
        reason: '根据你喜欢看热血战斗类动漫的偏好推荐'
      },
      {
        id: 2,
        title: '地缚少年花子君 第二季',
        cover: 'https://cdn.myanimelist.net/r/216x326/images/anime/1878/146291.webp',
        matchRate: 95,
        category: '奇幻',
        reason: '与你最近观看的奇幻类作品风格相似'
      },
      {
        id: 3,
        title: '间谍过家家 第二季',
        cover: 'https://cdn.myanimelist.net/images/anime/1027/138900.jpg',
        matchRate: 92,
        category: '喜剧',
        reason: '你对家庭喜剧类型的作品评分较高'
      }
    ],
    categories: [
      { name: '热血', count: 28 },
      { name: '奇幻', count: 24 },
      { name: '战斗', count: 20 },
      { name: '冒险', count: 18 },
      { name: '悬疑', count: 15 }
    ],
    categoryAnime: [
      {
        id: 1,
        title: '咒术回战 第二季',
        cover: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
        score: 9.1
      },
      {
        id: 2,
        title: '地缚少年花子君 第二季',
        cover: 'https://cdn.myanimelist.net/r/216x326/images/anime/1878/146291.webp',
        score: 8.9
      },
      {
        id: 3,
        title: '间谍过家家 第二季',
        cover: 'https://cdn.myanimelist.net/images/anime/1027/138900.jpg',
        score: 8.8
      },
      {
        id: 4,
        title: '进击的巨人 最终季',
        cover: 'https://cdn.myanimelist.net/images/anime/1948/120625.jpg',
        score: 9.0
      }
    ],
    preferences: [
      { name: '热血', value: 35 },
      { name: '奇幻', value: 25 },
      { name: '战斗', value: 20 },
      { name: '冒险', value: 15 },
      { name: '悬疑', value: 5 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initChart();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  initChart() {
    this.preferenceChart = this.selectComponent('#preferenceChart');
    this.preferenceChart.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      
      const option = {
        backgroundColor: '#ffffff',
        title: {
          text: '观看偏好分布',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#333333',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}%'
        },
        series: [{
          name: '观看偏好',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{c}%',
            color: '#666666',
            fontSize: 12
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          data: this.data.preferences.map(item => ({
            name: item.name,
            value: item.value
          }))
        }]
      };
      
      chart.setOption(option);
      return chart;
    });
  },

  changeCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category
    });
    // 这里可以添加根据分类加载动漫列表的逻辑
  }
})