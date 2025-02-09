Component({
  properties: {
    canvasId: {
      type: String,
      value: 'ec-canvas'
    },

    ec: {
      type: Object
    }
  },

  data: {
    isUseNew: false
  },

  ready: function () {
    if (!this.data.ec) {
      console.warn('组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' +
        'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>');
      return;
    }

    if (!this.data.ec.lazyLoad) {
      this.init();
    }
  },

  methods: {
    init: function (callback) {
      const version = wx.version.version.split('.').map(n => parseInt(n, 10));
      const isValid = version[0] > 1 || (version[0] === 1 && version[1] >= 9);
      this.setData({ isUseNew: isValid });

      const ctx = wx.createCanvasContext(this.data.canvasId, this);

      const canvas = {
        setChart(chart) {
          this.chart = chart;
        },
        setOption: function (option) {
          if (!this.chart) {
            console.warn('请在 chart ready 回调函数中设置');
            return;
          }
          this.chart.setOption(option);
        },
        showLoading: function (opts) {
          if (!this.chart) {
            console.warn('请在 chart ready 回调函数中设置');
            return;
          }
          this.chart.showLoading(opts);
        },
        hideLoading: function () {
          if (!this.chart) {
            console.warn('请在 chart ready 回调函数中设置');
            return;
          }
          this.chart.hideLoading();
        },
        clear: function () {
          if (!this.chart) {
            console.warn('请在 chart ready 回调函数中设置');
            return;
          }
          this.chart.clear();
        },
        dispose: function () {
          if (!this.chart) {
            console.warn('请在 chart ready 回调函数中设置');
            return;
          }
          this.chart.dispose();
        }
      };

      if (this.data.ec.onInit) {
        this.chart = this.data.ec.onInit(canvas, this.data.ec.width, this.data.ec.height);
      }
      else if (this.data.ec.init) {
        this.chart = this.data.ec.init(canvas, this.data.ec.width, this.data.ec.height);
      }

      if (callback) {
        callback();
      }
    },

    canvasToTempFilePath(opt) {
      const that = this;
      opt = opt || {};
      opt.canvasId = this.data.canvasId;

      if (this.data.isUseNew) {
        // 新版
        const query = wx.createSelectorQuery().in(this);
        query.select('.ec-canvas')
          .fields({ node: true, size: true })
          .exec(res => {
            const canvas = res[0].node;
            opt.canvas = canvas;
            wx.canvasToTempFilePath(opt);
          });
      }
      else {
        // 旧版
        if (!opt.success) {
          opt.success = () => {};
        }
        wx.canvasToTempFilePath(opt, this);
      }
    },

    touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        this.chart._zr.handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y
        });
        this.chart._zr.handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    },

    touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        this.chart._zr.handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    },

    touchEnd(e) {
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        this.chart._zr.handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y
        });
        this.chart._zr.handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    }
  }
}); 