<template lang="pug">
.sketch-color-picker(:class="[scheme]")
	.sketch-color-picker--saturation-wrap
		saturation(:colors.sync="colors", :on-change="childChange")

	.sketch-color-picker--controls
		.sketch-color-picker--sliders
			.sketch-color-picker--hue-wrap
				hue(:colors.sync="colors", :on-change="childChange")

			.sketch-color-picker--alpha-wrap
				alpha(:colors.sync="colors", :on-change="childChange")

		.sketch-color-picker--color-wrap
			.sketch-color-picker--active-color(:style="{background: activeColor}")

	.sketch-color-picker--fields
		.sketch-color-picker--field-double
			editable-input(label="hex", :val.sync="colors.hex", :on-change="inputChange")

		.sketch-color-picker--field-single
			editable-input.nb-left(label="r",
			:val.sync="colors.rgba.r",
			:on-change="inputChange")

		.sketch-color-picker--field-single
			editable-input.nb-left(label="g",
			:val.sync="colors.rgba.g",
			:on-change="inputChange")

		.sketch-color-picker--field-single
			editable-input.nb-left(label="b",
			:val.sync="colors.rgba.b",
			:on-change="inputChange")

		.sketch-color-picker--field-single
			editable-input.nb-left(label="a",
			:val.sync="colors.a",
			:on-change="inputChange")

	.sketch-color-picker--presets
		.sketch-color-picker--presets-color(
		v-for="c in presetColors",
		:style="{background: c}",
		@click="handlePreset(c)",
		@contextmenu="removePreset($event, c)")
		a.sketch-color-picker--presets-color(@click="addPreset()") +
</template>

<script>
import colorMixin from '../mixin/color'
import editableInput from './EditableInput.vue'
import saturation from './Saturation.vue'
import hue from './Hue.vue'
import alpha from './Alpha.vue'

export default {
	name: 'SketchColorPicker',
	mixins: [colorMixin],
	components: {
		saturation,
		hue,
		alpha,
		editableInput
	},

	props: {
		scheme: {
			type: String,
			default: 'light'
		},

		presetColors: {
			type: Array,
			default: () => [
				'#2ecc71', '#27ae60', '#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c', '#34495e',
				'#1abc9c', '#16a085', '#2980b9', '#8e44ad', '#f39c12', '#d35400', '#c0392b', '#2c3e50',
				'#ecf0f1', '#bdc3c7', '#95a5a6', '#7f8c8d'
			]
		}
	},

	computed: {
		activeColor () {
			var rgba = this.colors.rgba
			return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
		}
	},

	methods: {
		addPreset () {
			let colorIndex = this.presetColors.indexOf(this.colors.hex)
			if (colorIndex<0) {
				this.presetColors.push(this.colors.hex)
			}
		},
		
		handlePreset (color) {
			this.colorChange({
				hex: color,
				source: 'hex'
			})
		},

		removePreset (event, color) {
			event.preventDefault()

			let colorIndex = this.presetColors.indexOf(color)
			if (colorIndex > -1) {
				this.presetColors.splice(colorIndex, 1)
			}
		},

		childChange (data) {
			this.colorChange(data)
		},

		inputChange (data) {
			if (! data) {
				return
			}

			if (data.hex) {
				this.isValidHex(data.hex) && this.colorChange({
					hex: data.hex,
					source: 'hex'
				})
			} else if (data.r || data.g || data.b || data.a) {
				this.colorChange({
					r: data.r || this.colors.rgba.r,
					g: data.g || this.colors.rgba.g,
					b: data.b || this.colors.rgba.b,
					a: data.a || this.colors.rgba.a,
					source: 'rgba'
				})
			}
		}
	}
}
</script>

<style lang="sass">
$white: #ffffff;
$dark: #171d1f;

.sketch-color-picker {
	position: relative;
	width: 200px;
	margin: 0 auto;
	padding: 10px 10px 0;
	box-sizing: initial;
	border-radius: 4px;
	box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);
	&.light {
		background: $white;
		.sketch-color-picker--editable-input---label {
			color: $dark;
		}
		.sketch-color-picker--presets-color {
			box-shadow: inset 0 0 0 1px rgba(0,0,0,.15);
		}
	}

	&.dark {
		background: $dark;
		.sketch-color-picker--editable-input---label {
			color: darken($white, 3);
		}
		.sketch-color-picker--presets {
			border-top-color: lighten($dark, 2);
		}
		.sketch-color-picker--presets-color {
			box-shadow: inset 0 0 0 1px rgba(255,255,255,.15);
		}
	}
}
	
.sketch-color-picker--saturation-wrap {
	width: 100%;
	padding-bottom: 75%;
	position: relative;
	overflow: hidden;
}

.sketch-color-picker--controls {
	display: flex;
}

.sketch-color-picker--sliders {
	padding: 4px 0;
	flex: 1;

	.vue-color--c-hue,
	.vue-color--c-alpha--gradient {
		border-radius: 2px
	}
}

.sketch-color-picker--hue-wrap {
	position: relative;
	height: 10px;
}

.sketch-color-picker--alpha-wrap {
	position: relative;
	height: 10px;
	margin-top: 4px;
	overflow: hidden;
}

.sketch-color-picker--color-wrap {
	width: 24px;
	height: 24px;
	position: relative;
	margin-top: 4px;
	margin-left: 4px;
	border-radius: 3px;
}

.sketch-color-picker--active-color {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: 2px;
	box-shadow: inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25);
	z-index: 2;
}

.sketch-color-picker--fields {
	display: flex;
	padding-top: 4px;

	.sketch-color-picker--editable-input---input {
		width: 80%;
		padding: 4px 10% 3px;
		border: 1px solid #ccc;
		font-size: 11px;

		&.nb-left {
			border-left: none;
		}
	}

	.sketch-color-picker--editable-input---label {
		display: block;
		text-align: center;
		font-size: 11px;
		padding-top: 3px;
		padding-bottom: 4px;
		text-transform: capitalize;
	}
}

.sketch-color-picker--field-single {
	flex: 1;
	padding-left: 6px;
}

.sketch-color-picker--field-double {
	flex: 2
}

.sketch-color-picker--presets {
	margin-right: -10px;
	margin-left: -10px;
	padding-left: 10px;
	padding-top: 10px;
	border-top: 1px solid #eee;
}

.sketch-color-picker--presets-color {
	border-radius: 3px;
	overflow: hidden;
	position: relative;
	display: inline-block;
	margin: 0 10px 10px 0;
	vertical-align: top;
	cursor: pointer;
	width: 16px;
	height: 16px;
	box-shadow: inset 0 0 0 1px rgba(0,0,0,.15);
}
a.sketch-color-picker--presets-color {
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
</style>