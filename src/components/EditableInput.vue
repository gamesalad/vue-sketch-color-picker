<template lang="pug">
.sketch-color-picker--editable-input
	input.sketch-color-picker--editable-input---input(
	v-model="val | maxFilter",
	@keydown="handleKeyDown",
	@input="handleChange")

	.sketch-color-picker--editable-input---label(@mousedown="handleMouseDown") {{label}}
</template>

<script>
export default {
	name: 'editableInput',
	props: {
		label: {
			type: String
		},

		val: {
			type: [String, Number]
		},

		max: {
			type: Number
		},

		onChange: {
			type: Function
		},

		arrowOffset: {
			type: Number,
			default: 1
		}
	},

	filters: {
		maxFilter: {
			read (val) {
				if (this.max && val > this.max) {
					return this.max
				} else {
					return val
				}
			},

			write (val, oldVal) {
				return val
			}
		}
	},

	methods: {
		handleChange (e) {
			let data = {}
			data[this.label] = this.val
			this.onChange(data)
		},

		handleBlur (e) {
			console.log(e)
		},

		handleKeyDown (e) {
			let val = this.val, number = Number(val)

			if (number) {
				let amount = this.arrowOffset || 1

				if (e.keyCode === 38) {
					this.val = number + amount
					e.preventDefault()
				}

				if (e.keyCode === 40) {
					this.val = number - amount
					e.preventDefault()
				}

				this.handleChange()
			}
		},

		handleDrag (e) {
			console.log(e)
		},

		handleMouseDown (e) {
			console.log(e)
		}
	}
}
</script>

<style lang="sass">
.sketch-color-picker--editable-input {
	position: relative;
	&---input {
		padding: 0;
		border: 0;
		outline: none;
	}

	&---label {
		text-transform: capitalize;
	}
}
</style>