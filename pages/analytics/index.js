Page({
  data: {
    ec: {
      lazyLoad: true
    },
    watchTimeChart: null,
    userPreferencesChart: null,
    // Mock数据
    mockData: {
      // 用户偏好数据
      userPreferences: [
        { name: '热血', value: 35 },
        { name: '奇幻', value: 25 },
        { name: '战斗', value: 20 },
        { name: '冒险', value: 15 },
        { name: '悬疑', value: 5 }
      ],
      // 观看时长数据
      watchTimeData: {
        days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        times: [120, 180, 150, 210, 240, 360, 420]
      },
      // 观看统计
      stats: {
        totalTime: 1680,
        totalAnime: 28,
        avgScore: 8.7,
        timeGrowth: 12.5,
        animeGrowth: 8.3,
        scoreGrowth: 0.5
      }
    }
  },

  onLoad() {
    this.initCharts();
  },

  initCharts() {
    this.initWatchTimeChart();
    this.initUserPreferencesChart();
  },

  initWatchTimeChart() {
    const { days, times } = this.data.mockData.watchTimeData;
    this.watchTimeChart = this.selectComponent('#watchTimeChart');
    this.watchTimeChart.init((canvas, width, height) => {
      const chart = wx.createChart(canvas, width, height);
      const option = {
        title: {
          text: '每日观看时长分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}分钟'
        },
        xAxis: {
          type: 'category',
          data: days,
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          name: '观看时长(分钟)'
        },
        series: [{
          data: times,
          type: 'bar',
          itemStyle: {
            color: '#ff6b81'
          },
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      };
      chart.setOption(option);
      return chart;
    });
  },

  initUserPreferencesChart() {
    const userPreferences = this.data.mockData.userPreferences;
    this.userPreferencesChart = this.selectComponent('#userPreferencesChart');
    this.userPreferencesChart.init((canvas, width, height) => {
      const chart = wx.createChart(canvas, width, height);
      const option = {
        title: {
          text: '观看偏好分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}%'
        },
        series: [{
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
            formatter: '{b}\n{c}%'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          data: userPreferences
        }]
      };
      chart.setOption(option);
      return chart;
    });
  }
}); 