# vue-countup

> CountUp component for Vue.js

## Installation

``` bash
$ yarn add @wjtools/vue-countup
```


## Usage

``` vue
<template>
  <CountUp :endVal="endVal" />
</template>

<script>
  import CountUp from 'vue-countup'
  export default {
    components: { CountUp },
    data() {
      return { endVal: 1688 }
    }
  }
</script>
```

## Properties

### startVal

- type: `Number`
- default: `0`

The value you want to begin at

### endVal

- required: `true`
- type: `Number`
- default: `0`

The value you want to arrive at

### decimals

- type: `Number`
- default: `0`

Number of decimal places in number

### duration

- type: `Number`
- default: `0`

Duration in seconds

### tag

- type: `String`
- default: `span`

### color

- type: `String`

### isLargeVal

- type: `Boolean`
- default: `false`

Animating to large numbers

### options

- type: `Number`
- default: `{ useGrouping: false }`

Formatting/easing options object

See more [CountUp.js](https://github.com/inorganik/countUp.js)


## Methods

* `start`: Start animation
* `pauseResume`: Toggle pause/resume
* `reset`: Reset an animation
* `update`: Update the end value and animat

``` vue
<template>
  <CountUp ref="countup" :endVal="1688" :autoplay="false" />
</template>

<script>
  export default {
    mounted() {
      this.$refs.countup.start()
    }
  }
</script>
```


## Events

* done: ({ countup }) => void

Emits when the animation completes

``` vue
<template>
  <CountUp :endVal="1688" :done="complete" />
</template>

<script>
  export default {
    mounted() {
      complete(countup) {
        console.log(countup)
      }
    }
  }
</script>
```


## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+


# License

[MIT](https://opensource.org/licenses/MIT)