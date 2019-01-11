<template>
  <span class="count-up" :style="{color}">{{ startVal }}</span>
</template>

<script>
import CountUp from 'countup'

export default {
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
    color: {
      type: String
    },
    isLargeVal: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default() {
        return {
          useEasing: true,
          useGrouping: true,
          separator: '',
          decimal: '.'
        }
      }
    }
  },

  data() {
    return {
      countup: null
    }
  },

  watch: {
    endVal(val) {
      this.update(val)
    }
  },

  mounted() {
    this.init()
  },

  destroyed() {
    this.destroy()
  },

  methods: {
    init() {
      if (this.autoplay) {
        this.initCountup()
        window.addEventListener('scroll', this.initCountup)
      }
      this.playOnShow && document.addEventListener('visibilitychange', this.onVisibilityChange)
    },

    initCountup() {
      // 已初始化或不在视图内
      if (this.countup || !this.isInViewport()) {
        return
      }

      const isLargeVal = this.isLargeVal
      let endVal = isLargeVal ? this.endVal - 100 : this.endVal
      let duration = isLargeVal ? this.duration / 2 : this.duration

      const countup = this.countup = new CountUp(
        this.$el,
        this.startVal,
        endVal < 0 ? 0 : endVal,
        this.decimals,
        duration,
        this.options
      )

      if (countup.error) {
        console.error(countup.error)
      } else {
        this.start()
      }
    },

    // 初始化并执行完动画
    done() {
      this.$emit('done', this.countup)
    },

    start(callback = this.done) {
      const countup = this.countup
      return countup && countup.start(() => {
        if (this.isLargeVal) {
          this.update(this.endVal)
          setTimeout(callback, this.duration)
        } else {
          callback()
        }
      })
    },

    // 暂停/恢复动画
    pauseResume() {
      return this.countup && this.countup.pauseResume()
    },

    reset() {
      return this.countup && this.countup.reset()
    },

    // 改变 endVlaue，并开启动画
    update(newEndVal = this.endVal) {
      return this.countup && this.countup.update(newEndVal)
    },

    isInViewport(el = this.$el, offset = 0) {
      const box = this.$el.getBoundingClientRect()
      let top = box.top >= 0
      let left = box.left >= 0
      let bottom = box.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset
      let right = box.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
      return top && left && bottom && right
    },

    onVisibilityChange() {
      switch (document.visibilityState) {
        case 'visible':
          // this.pauseResume()
          this.initCountup()
          break
        case 'hidden':
          // this.pauseResume()
          this.reset()
          break
      }
    },

    destroy() {
      this.countup = null
      this.playOnShow && document.removeEventListener('visibilitychange', this.onVisibilityChange)
      this.autoplay && window.removeEventListener('scroll', this.initCountup)
    }
  }
}
</script>
