export default {
  props: {
    presets: {
      type: Array,
      default: () => [
        '#2ecc71', '#27ae60', '#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c', '#34495e',
        '#1abc9c', '#16a085', '#2980b9', '#8e44ad', '#f39c12', '#d35400', '#c0392b', '#2c3e50',
        '#ecf0f1', '#bdc3c7', '#95a5a6', '#7f8c8d'
      ]
    }
  },

  data () {
    return {
      _presets: []
    }
  },

  created () {
    this._presets = this.presets
  },

  methods: {
    addPreset () {
      let colorIndex = this._presets.indexOf(this.colors.hex)
      if (colorIndex < 0) {
        this._presets.push(this.colors.hex)
      }
    },

    removePreset (event, color) {
      event.preventDefault()
      let colorIndex = this._presets.indexOf(color)
      if (colorIndex > -1) {
        this._presets.splice(colorIndex, 1)
      }
    }
  }
}
