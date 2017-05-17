import Vue from 'vue'
import ColorPicker from '@/components/ColorPicker'

describe('Main ColorPikcer', () => {
  const Constructor = Vue.extend(ColorPicker)
  const vm = new Constructor().$mount()

  it('should render correctly', () => {
    expect(vm.$el.classList.contains('.sketch-color-picker')).to.not.equal(null)
  })
})
