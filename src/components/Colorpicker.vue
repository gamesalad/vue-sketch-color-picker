<template>
<div :class="[scheme]" class="sketch-color-picker">
  <div class="sketch-color-picker--saturation-wrap">
    <Saturation v-model="colors" @update="pickerChange" />
  </div>
  <div class="sketch-color-picker--controls">
    <div class="sketch-color-picker--sliders">
      <div class="sketch-color-picker--hue-wrap">
        <Hue v-model="colors" @update="pickerChange" />
      </div>
      <div class="sketch-color-picker--alpha-wrap">
        <Alpha v-model="colors" @update="pickerChange" />
      </div>
    </div>
    <div class="sketch-color-picker--color-wrap">
      <div :style="{background: activeColor}" class="sketch-color-picker--active-color" />
    </div>
  </div>
  <div class="sketch-color-picker--fields">
    <div class="sketch-color-picker--field-double">
      <EditableInput label="hex" v-model="colors" @update="inputChange" />
    </div>
    <div class="sketch-color-picker--field-single">
      <EditableInput label="r" v-model="colors" @update="inputChange" class="nb-left" />
    </div>
    <div class="sketch-color-picker--field-single">
      <EditableInput label="g" v-model="colors" @update="inputChange" class="nb-left" />
    </div>
    <div class="sketch-color-picker--field-single">
      <EditableInput label="b" v-model="colors" @update="inputChange" class="nb-left" />
    </div>
    <div class="sketch-color-picker--field-single">
      <EditableInput label="a" v-model="colors" @update="inputChange" class="nb-left" />
    </div>
  </div>
  <div class="sketch-color-picker--presets">
    <div v-for="color in presets"
      :style="{backgroundColor: color}"
      @click="changeColor(color)"
      @contextmenu="removePreset($event, color)"
      class="sketch-color-picker--presets-color" />
    <a @click="addPreset()" class="sketch-color-picker--presets-color">+</a>
  </div>
</div>
</template>

<script>
import ColorMixin from '../mixins/color'
import PresetMixin from '../mixins/preset'
import Saturation from './Saturation.vue'
import Hue from './Hue.vue'
import Alpha from './Alpha.vue'
import EditableInput from './EditableInput.vue'

export default {
  name: 'Colorpicker',
  components: {
    Saturation,
    Hue,
    Alpha,
    EditableInput
  },
  mixins: [ColorMixin, PresetMixin],
  props: {
    scheme: {
      type: String,
      default: 'light'
    }
  },
  computed: {
    activeColor () {
      const { r, g, b, a } = this.colors.rgba
      return `rgba(${[r, g, b, a].join(',')})`
    }
  },
  methods: {
    changeColor (color) {
      this.setColor({
        hex: color,
        source: 'hex'
      })
    },

    pickerChange (color) {
      this.setColor(color)
    },

    inputChange (data) {
      if (!data) {
        return
      }

      if (data.hex) {
        this.isValidHex(data.hex) && this.setColor({
          hex: data.hex,
          source: 'hex'
        })
      } else if (data.r || data.g || data.b || data.a) {
        const { r, g, b, a } = this.colors
        this.setColor({
          r: data.r || r,
          g: data.g || g,
          b: data.b || b,
          a: data.a || a,
          source: 'rgba'
        })
      }
    }
  }
}
</script>

<style lang="scss">
$white: #ffffff;
$dark: #171d1f;
$prefix: 'sketch-color-picker';

.#{$prefix} {
  position: relative;
  width: 200px;
  margin: 0 auto;
  padding: 10px 10px 0;
  box-sizing: initial;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);
  &.light {
    background: $white;
    .#{$prefix}--editable__label {
      color: $dark;
    }
    .#{$prefix}--presets-color {
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.15);
    }
  }
  &.dark {
    background: $dark;
    .#{$prefix}--editable__label {
      color: darken($white, 3);
    }
    .#{$prefix}--presets {
      border-top-color: lighten($dark, 2);
    }
    .#{$prefix}--presets-color {
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.15);
    }
  }

  &--saturation-wrap {
    width: 100%;
    padding-bottom: 75%;
    position: relative;
    overflow: hidden;
  }

  &--controls {
    display: flex;
  }

  &--sliders {
    padding: 4px 0;
    flex: 1;
    .#{$prefix}--c-hue,
    .#{$prefix}--c-alpha--gradient {
      border-radius: 2px
    }
  }

  &--hue-wrap {
    position: relative;
    height: 10px;
  }

  &--alpha-wrap {
    position: relative;
    height: 10px;
    margin-top: 4px;
    overflow: hidden;
  }

  &--color-wrap {
    width: 24px;
    height: 24px;
    position: relative;
    margin-top: 4px;
    margin-left: 4px;
    border-radius: 3px;
  }

  &--active-color {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25);
    z-index: 2;
  }

  &--fields {
    display: flex;
    padding-top: 4px;
  }

  &--field-single {
    flex: 1;
    padding-left: 6px;
  }
  &--field-double {
    flex: 2
  }
  &--presets {
    border-top: 1px solid #eee;
    display: flex;
    flex-wrap: wrap;
  }
  &--presets-color {
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin-bottom: 10px;
    margin-right: 10px;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.15);
    &:last-child {
      margin-right: auto;
    }
    &:nth-child(8n) {
      margin-right: 0;
    }
  }

  a.#{$prefix}--presets-color {
    text-decoration: none;
    text-align: center;
    vertical-align: 0;
    line-height: 16px;
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: #d9d9d9;
    border-radius: 2px;
    font-family: arial,sans-serif;
  }
}
</style>
