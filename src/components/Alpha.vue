<template>
<div class="sketch-color-picker--c-alpha">
  <div class="sketch-color-picker--c-alpha--checkboard-wrap">
    <Checkboard />
  </div>

  <div class="sketch-color-picker--c-alpha-gradient" :style="{background: gradientColor}" />
  <div class="sketch-color-picker--c-alpha-container" ref="container"
    @mousedown="mousedown"
    @touchmove="update"
    @touchstart="update">
    <div class="sketch-color-picker--c-alpha-pointer" :style="pointerStyles">
      <slot>
        <div class="sketch-color-picker--c-alpha-picker"></div>
      </slot>
    </div>
  </div>
</div>
</template>

<script>
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
    update (event, skip) {
      !skip && event.preventDefault()

      const container = this.$refs.container
      const containerWidth = container.clientWidth
      let left = (event.pageX || event.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset)
      let a = Math.round(left * 100 / containerWidth) / 100

      if (left > containerWidth) {
        a = 1
      } else if (left < 0.01) {
        a = 0
      }

      if (this.colors.a !== a) {
        const colors = {
          h: this.colors.hsl.h,
          s: this.colors.hsl.s,
          l: this.colors.hsl.l,
          a: a,
          source: 'rgba'
        }

        this.$emit('update', colors)
      }
    },

    mousedown (event) {
      this.update(event, true)
      window.addEventListener('mousemove', this.update)
      window.addEventListener('mouseup', this.mouseup)
    },

    mouseup () {
      this.unbindEvents()
    },

    unbindEvents () {
      window.removeEventListener('mousemove', this.update)
      window.removeEventListener('mouseup', this.mouseup)
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
