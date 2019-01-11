const babel = require('rollup-plugin-babel')
const pkg = require('./package')

// const name = 'CountUp'
pkg.name = pkg.name.replace(/^.+\//, '')

module.exports = {
  input: 'src/index.js',
  output: [{
    file: `dist/${pkg.name}.common.js`,
    format: 'cjs'
  }, {
    file: `dist/${pkg.name}.esm.js`,
    format: 'esm'
  }, {
    file: `docs/js/${pkg.name}.js`,
    format: 'umd'
  }],
  plugins: [babel()],
  watch: {
    include: 'src/**'
  }
}
