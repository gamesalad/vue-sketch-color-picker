<template>
<div class="sketch-color-picker--editable">
  <input type="text" class="sketch-color-picker--editable__input"
    v-model="colors"
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
    colors () {
      if ('rgba'.split('').includes(this.label)) {
        return this.value.rgba[this.label]
      }

      return this.value[this.label]
    }
  },

  data () {
    return {
      initialValue: ''
    }
  },

  methods: {
    getColor (e) {
      let colors = {}
      let val = e.target.value

      if (val >= 0 && val <= 0xff && 'rgba'.split('').includes(this.label)) {
        val = Number(e.target.value)
        if (this.label === 'a') {
          val = parseFloat(e.target.value)
        }
      }

      colors[this.label] = val
      return colors
    },

    handleInput (e) {
      this.$emit('change', this.getColor(e))
    },

    handleFocus (e) {
      this.initialValue = this.getColor(e)
    },

    handleUpdate (e) {
      const colors = this.getColor(e)
      if (colors[this.label] !== this.initialValue[this.label]) {
        this.$emit('update')
      }
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
