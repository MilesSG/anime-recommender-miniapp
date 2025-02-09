Component({
  properties: {
    animeId: {
      type: Number,
      value: 0
    }
  },

  data: {
    ec: {
      lazyLoad: true
    },
    trendChart: null,
    similarityChart: null,
    userPreferencesChart: null,
    watchTimeChart: null,
    // Mock数据
    mockData: {
      // 热度趋势数据
      trendData: {
        dates: ['1月', '2月', '3月', '4月', '5月', '6月'],
        values: [2300, 2800, 3200, 4500, 6000, 7800]
      },
      // 相似度数据
      similarityData: [
        { name: '进击的巨人', value: 92 },
        { name: '咒术回战', value: 85 },
        { name: '间谍过家家', value: 78 },
        { name: '链锯人', value: 75 },
        { name: '死神千年血战篇', value: 70 }
      ],
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
      }
    }
  },

  lifetimes: {
    attached() {
      this.initCharts();
    }
  },

  methods: {
    initCharts() {
      this.initTrendChart();
      this.initSimilarityChart();
      this.initUserPreferencesChart();
      this.initWatchTimeChart();
    },

    initTrendChart() {
      const { dates, values } = this.data.mockData.trendData;
      this.trendChart = this.selectComponent('#trendChart');
      this.trendChart.init((canvas, width, height) => {
        const chart = wx.createChart(canvas, width, height);
        const option = {
          title: {
            text: '热度趋势',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: dates
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
    },

    initSimilarityChart() {
      const similarityData = this.data.mockData.similarityData;
      this.similarityChart = this.selectComponent('#similarityChart');
      this.similarityChart.init((canvas, width, height) => {
        const chart = wx.createChart(canvas, width, height);
        const option = {
          title: {
            text: '相似动漫推荐',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}% 相似度'
          },
          series: [{
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false
            },
            axisLine: {
              lineStyle: {
                width: 40
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            data: similarityData,
            title: {
              fontSize: 14
            },
            detail: {
              width: 50,
              height: 14,
              fontSize: 14,
              color: 'auto',
              formatter: '{value}%'
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
            text: '用户偏好分析',
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
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: userPreferences
          }]
        };
        chart.setOption(option);
        return chart;
      });
    },

    initWatchTimeChart() {
      const { days, times } = this.data.mockData.watchTimeData;
      this.watchTimeChart = this.selectComponent('#watchTimeChart');
      this.watchTimeChart.init((canvas, width, height) => {
        const chart = wx.createChart(canvas, width, height);
        const option = {
          title: {
            text: '每日观看时长',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b}: {c}分钟'
          },
          xAxis: {
            type: 'category',
            data: days
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
    }
  }
}); 