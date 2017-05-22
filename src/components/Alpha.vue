<template>
<div class="sketch-color-picker--c-alpha">
  <div class="sketch-color-picker--c-alpha--checkboard-wrap">
    <Checkboard />
  </div>

  <div class="sketch-color-picker--c-alpha-gradient" :style="{background: gradientColor}" />
  <div class="sketch-color-picker--c-alpha-container" ref="container"
    @mousedown="handleMousedown"
    @touchmove="handleChange"
    @touchstart="handleChange">
    <div class="sketch-color-picker--c-alpha-pointer" :style="pointerStyles">
      <slot>
        <div class="sketch-color-picker--c-alpha-picker"></div>
      </slot>
    </div>
  </div>
</div>
</template>

<script>
import srcType from '../srcType'
import Checkboard from './Checkboard.vue'
export default {
  name: 'Alpha',

  props: {
    value: {
      type: Object
    }
  },

  components: {
    Checkboard
  },

  computed: {
    colors () {
      return this.value
    },

    pointerStyles () {
      return {
        left: this.colors.a * 100 + '%'
      }
    },

    gradientColor () {
      const {r, g, b} = this.colors.rgba
      const rgbStr = [r, g, b].join(',')
      return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`
    }
  },
  methods: {
    handleChange (event, skip) {
      if (!skip) {
        event.preventDefault()
      }

      const container = this.$refs.container
      const containerWidth = container.clientWidth
      let left = (event.pageX || event.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset)
      let a = Math.round(left * 100 / containerWidth) / 100

      if (left < 0) {
        a = 0
      }

      if (left > 0 && left > containerWidth) {
        a = 1
      }

      if (this.colors.a !== a) {
        const colors = {
          h: this.colors.hsl.h,
          s: this.colors.hsl.s,
          l: this.colors.hsl.l,
          a: a,
          source: srcType.RGBA
        }

        this.$emit('change', colors)
      }
    },

    handleMousedown (event) {
      this.handleChange(event, true)
      this.$emit('mousedown', this.colors)
      window.addEventListener('mousemove', this.handleChange)
      window.addEventListener('mouseup', this.handleMouseup)
    },

    handleMouseup () {
      this.$emit('mouseup')
      this.unbindEventListeners()
    },

    unbindEventListeners () {
      window.removeEventListener('mousemove', this.handleChange)
      window.removeEventListener('mouseup', this.handleMouseup)
    }
  }
}
</script>

<style lang="scss">
.sketch-color-picker {
  &--c-alpha {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    &-checkboard-wrap {
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      overflow: hidden;
    }
    &-gradient {
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
    }
    &-container {
      cursor: pointer;
      position: relative;
      z-index: 2;
      height: 100%;
      margin: 0 3px;
    }
    &-pointer {
      z-index: 2;
      position: absolute;
    }
    &-picker {
      cursor: pointer;
      width: 4px;
      border-radius: 1px;
      height: 8px;
      box-shadow: 0 0 2px rgba(0, 0, 0, .6);
      background: #fff;
      margin-top: 1px;
      transform: translateX(-2px);
    }
  }
}
</style>
