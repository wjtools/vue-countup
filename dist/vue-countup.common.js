'use strict';

var index = {
  name: 'CountUp',
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
    },
    decimals: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 2
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    playOnShow: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'span'
    },
    color: {
      type: String
    },
    isLargeVal: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: function _default() {
        return {
          useGrouping: false
        };
      }
    }
  },
  data: function data() {
    return {
      countup: null
    };
  },
  watch: {
    endVal: function endVal(val) {
      this.update(val);
    }
  },
  mounted: function mounted() {
    this.init();
  },
  destroyed: function destroyed() {
    this.destroy();
  },
  methods: {
    init: function init() {
      if (this.autoplay) {
        this.initCountup();
        window.addEventListener('scroll', this.initCountup);
      }

      this.playOnShow && document.addEventListener('visibilitychange', this.onVisibilityChange);
    },
    initCountup: function initCountup() {
      // 已初始化或不在视图内
      if (this.countup || !this.isInViewport()) {
        return;
      }

      var isLargeVal = this.isLargeVal;
      var endVal = isLargeVal ? this.endVal - 100 : this.endVal;
      var duration = isLargeVal ? this.duration / 2 : this.duration;
      this.countup = new CountUp(this.$el, this.startVal, endVal < 0 ? 0 : endVal, this.decimals, duration, this.options);

      if (this.countup.error) {
        console.error(this.countup.error);
      } else {
        return this.start();
      }
    },
    // 初始化并执行完动画
    done: function done() {
      this.$emit('done', this.countup);
    },
    start: function start() {
      var _this = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.done;
      if (!this.countup) return this.initCountup();
      return this.countup.start(function () {
        if (_this.isLargeVal) {
          _this.update(_this.endVal);

          setTimeout(callback, _this.duration);
        } else {
          callback();
        }
      });
    },
    // 暂停/恢复动画
    pauseResume: function pauseResume() {
      return this.countup && this.countup.pauseResume();
    },
    reset: function reset() {
      return this.countup && this.countup.reset();
    },
    // 改变 endVlaue，并开启动画
    update: function update() {
      var newEndVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.endVal;
      return this.countup && this.countup.update(newEndVal);
    },
    isInViewport: function isInViewport() {
      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var box = this.$el.getBoundingClientRect();
      var top = box.top >= 0;
      var left = box.left >= 0;
      var bottom = box.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset;
      var right = box.right <= (window.innerWidth || document.documentElement.clientWidth) + offset;
      return top && left && bottom && right;
    },
    onVisibilityChange: function onVisibilityChange() {
      switch (document.visibilityState) {
        case 'visible':
          // this.pauseResume()
          this.initCountup();
          break;

        case 'hidden':
          // this.pauseResume()
          this.reset();
          break;
      }
    },
    destroy: function destroy() {
      this.countup = null;
      this.playOnShow && document.removeEventListener('visibilitychange', this.onVisibilityChange);
      this.autoplay && window.removeEventListener('scroll', this.initCountup);
    }
  },
  render: function render(h) {
    return h(this.tag, {
      style: {
        color: this.color
      }
    });
  }
};

module.exports = index;
