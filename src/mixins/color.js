import tinycolor from 'tinycolor2'
import srcType from '../srcType'

const updateColor = (data) => {
  if (data.a) {
    if (data.a > 1) data.a = 1
    if (data.a <= 0) data.a = 0
  }

  data.a = typeof data.a === 'undefined' ? 1 : data.a
  let color = tinycolor(data)

  if (data.hex) {
    color = tinycolor(data.hex)
    color.setAlpha(data.a)
  }

  const hsl = color.toHsl()
  const hsv = color.toHsv()

  if (hsl.s === 0) {
    hsl.h = data.h || 0
    hsv.h = data.h || 0
  }

  return {
    hsl: hsl,
    hex: color.toHexString().toUpperCase(),
    rgba: color.toRgb(),
    hsv: hsv,
    oldHue: data.h || hsl.h,
    source: data.source,
    a: data.a
  }
}

export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          hex: '#000000',
          hsl: {
            h: 150,
            s: 0.5,
            l: 0.2,
            a: 1
          },
          hsv: {
            h: 255,
            s: 255,
            v: 0.30,
            a: 1
          },
          rgba: {
            r: 255,
            g: 255,
            b: 255,
            a: 1
          },
          a: 1,
          source: srcType.SATURATION
        }
      }
    }
  },

  data () {
    return {
      store: updateColor(this.value),
      broadcast: false
    }
  },

  computed: {
    colors: {
      get () {
        return this.store
      },

      set (value) {
        this.store = value
        if (this.broadcast) {
          this.$emit('change', value)
        }
      }
    }
  },

  methods: {
    setColor (data, isBroadcast = true) {
      this.broadcast = isBroadcast
      this.colors = updateColor(data)
    },

    isValidHex (hex) {
      return tinycolor(hex).isValid()
    }
  }
}
