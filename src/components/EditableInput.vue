<template>
<div class="sketch-color-picker--editable">
  <input type="text" class="sketch-color-picker--editable__input"
    v-model="tmpInput"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleUpdate"
    :maxlength="max" />
  <div class="sketch-color-picker--editable__label">{{label}}</div>
</div>
</template>

<script>
export default {
  name: 'EditableInput',
  props: {
    value: {
      type: Object
    },

    label: {
      type: String
    },

    max: {
      type: String
    }
  },

  computed: {
    isRGB () {
      return 'rgb'.split('').includes(this.label)
    },
    colors () {
      if (this.isRGB) {
        let val = this.value.rgba[this.label]
        return Math.round(
          (val / 255) * 1000
        ) / 1000
      }

      return this.value[this.label]
    }
  },

  data () {
    return {
      initialValue: '',
      tmpInput: '',
      inFocus: false
    }
  },

  watch: {
    value () {
      if (!this.inFocus) {
        this.syncInput()
      }
    }
  },

  methods: {
    getColor (e) {
      let colors = {}
      let val = e.target.value

      if (this.isRGB && isNaN(val)) {
        throw new Error('Incomplete')
      } else {
        if (this.isRGB) {
          val = Math.min(1, val)
          val = Math.max(0, val)
          val = val * 255
        }

        if (val >= 0 && val <= 0xff && this.isRGB) {
          val = Number(val)
          if (this.label === 'a') {
            val = parseFloat(e.target.value)
          }
        }
      }

      colors[this.label] = val
      return colors
    },

    handleInput (e) {
      try {
        this.$emit('change', this.getColor(e))
      } catch (e) {
      }
    },

    handleFocus (e) {
      this.inFocus = true
      try {
        this.initialValue = this.getColor(e)
      } catch (e) {
      }
      this.syncInput()
    },

    handleUpdate (e) {
      this.inFocus = false
      try {
        const colors = this.getColor(e)
        if (colors[this.label] !== this.initialValue[this.label]) {
          this.$emit('update')
        }
      } catch (e) {
      }
      this.syncInput()
    },

    syncInput () {
      const _this = this
      this.$nextTick(() => {
        _this.tmpInput = this.colors
      })
    }
  },

  mounted () {
    this.initialValue = JSON.parse(JSON.stringify(this.value))
    this.tmpInput = this.colors
  }
}
</script>

<style lang="scss">
.sketch-color-picker--editable {
  position: relative;
  &__input {
    padding: 0;
    border: 0;
    outline: none;
    width: 80%;
    padding: 4px 10% 3px;
    border: 1px solid #ccc;
    font-size: 11px;
    &.nb-left {
      border-left: none;
    }
  }
  &__label {
    display: block;
    text-align: center;
    font-size: 11px;
    text-transform: capitalize;
    margin: 10px 0;
  }
}
</style>
