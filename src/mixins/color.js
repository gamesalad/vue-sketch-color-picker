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
    colors: {
      type: Object,
      default: () => {
        return {
          hex: '#000000',
          hsl: {
            h: 0,
            s: 0,
            l: 0,
            a: 0
          },
          hsv: {
            h: 0,
            s: 0,
            v: 1,
            a: 0
          },
          rgba: {
            r: 0,
            g: 0,
            b: 0,
            a: 0
          },
          a: 0,
          source: srcType.SATURATION
        }
      }
    }
  },

  data () {
    return {
      store: updateColor(this.colors),
      broadcast: false
    }
  },

  computed: {
    colorsModel: {
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
      this.colorsModel = updateColor(data)
    },

    isValidHex (hex) {
      return tinycolor(hex).isValid()
    }
  }
}
