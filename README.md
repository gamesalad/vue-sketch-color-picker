# vue-sketch-color-picker
Color Picker with Sketch Style. This is fork from https://github.com/xiaokaike/vue-color

## Installation

### NPM
```bash
$ npm install vue-sketch-color-picker
```

```js
import colorPicker from 'vue-sketch-color-picker'

new Vue({
  components: {
    colorPicker
  }
})
```

## Local setup

```
npm install
npm run dev
```

## Usage
```js

new Vue({
  el: '#app',
  components: {
    colorPickers
  },
  data: {
    colors: {
      hex: '#194d33',
      hsl: {
        h: 150,
        s: 0.5,
        l: 0.2,
        a: 1
      },
      hsv: {
        h: 150,
        s: 0.66,
        v: 0.30,
        a: 1
      },
      rgba: {
        r: 25,
        g: 77,
        b: 51,
        a: 1
      },
      a: 1
    }
  }
})

```

```html
<color-picker :colors.sync="colors"></color-picker>
```


## License
vue-sketch-color-picker is licensed under [The MIT License](LICENSE).
