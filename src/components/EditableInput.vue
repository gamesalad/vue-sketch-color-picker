<template>
<div class="sketch-color-picker--editable">
  <input type="text" class="sketch-color-picker--editable__input"
    v-model="colorValue"
    @keydown="keydown"
    @input="input" />
  <div class="sketch-color-picker--editable__label" @mousedown="mousedown">
    {{label}}
  </div>
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
      type: Number
    },

    arrowOffset: {
      type: Number,
      default: 1
    }
  },

  filters: {
    maxFilter: {
      read (val) {
        return (this.max && val > this.max)
          ? this.max
          : val
      },
      write (val, oldVal) {
        return val
      }
    }
  },

  computed: {
    colors () {
      return this.value
    },

    colorValue () {
      if (['r', 'g', 'b', 'a'].includes(this.label)) {
        return this.colors.rgba[this.label]
      }

      return this.colors[this.label]
    }
  },

  methods: {
    update (val) {
      let colors = {}
      colors[this.label] = val
      this.$emit('update', colors)
    },

    handleBlur (e) {
      console.log(e)
    },

    input (e) {
      this.update(e.target.value)
    },

    keydown (e) {
      let val = this.colors
      let number = Number(val)

      if (number) {
        let amount = this.arrowOffset || 1

        switch (e.keyCode) {
          case 38:
            val = number + amount
            e.preventDefault()
            break

          case 40:
            val = number - amount
            e.preventDefault()
            break
        }

        this.update(val)
      }
    },

    handleDrag (e) {
      console.log(e)
    },

    mousedown (e) {
      console.log(e)
    }
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
