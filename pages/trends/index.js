// pages/trends/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    trendChart: null,
    // Mock数据
    topTrends: [
      {
        id: 1,
        title: '咒术回战 第二季',
        cover: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
        growth: 156
      },
      {
        id: 2,
        title: '地缚少年花子君 第二季',
        cover: 'https://cdn.myanimelist.net/r/216x326/images/anime/1878/146291.webp',
        growth: 123
      },
      {
        id: 3,
        title: '间谍过家家 第二季',
        cover: 'https://cdn.myanimelist.net/images/anime/1027/138900.jpg',
        growth: 98
      }
    ],
    rankings: [
      {
        id: 1,
        title: '咒术回战 第二季',
        cover: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
        watchCount: 128900,
        trend: 'up',
        changeRate: 12
      },
      {
        id: 2,
        title: '地缚少年花子君 第二季',
        cover: 'https://cdn.myanimelist.net/r/216x326/images/anime/1878/146291.webp',
        watchCount: 98700,
        trend: 'up',
        changeRate: 8
      },
      {
        id: 3,
        title: '间谍过家家 第二季',
        cover: 'https://cdn.myanimelist.net/images/anime/1027/138900.jpg',
        watchCount: 89500,
        trend: 'down',
        changeRate: 3
      }
    ],
    trendData: {
      dates: ['1月', '2月', '3月', '4月', '5月', '6月'],
      values: [2300, 2800, 3200, 4500, 6000, 7800]
    }
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
    const { dates, values } = this.data.trendData;
    this.trendChart = this.selectComponent('#trendChart');
    this.trendChart.init((canvas, width, height) => {
      const chart = wx.createChart(canvas, width, height);
      const option = {
        title: {
          text: '近期热度趋势',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          name: '观看人数'
        },
        series: [{
          data: values,
          type: 'line',
          smooth: true,
          areaStyle: {
            opacity: 0.3
          },
          itemStyle: {
            color: '#ff6b81'
          }
        }]
      };
      chart.setOption(option);
      return chart;
    });
  }
})