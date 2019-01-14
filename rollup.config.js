const babel = require('rollup-plugin-babel')
import { eslint } from 'rollup-plugin-eslint'
const pkg = require('./package')

const name = 'CountUp'
pkg.name = pkg.name.replace(/^.+\//, '')

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: `dist/${pkg.name}.common.js`,
      format: 'cjs'
    },
    {
      file: `dist/${pkg.name}.esm.js`,
      format: 'esm'
    },
    {
      name,
      file: `dist/${pkg.name}.js`,
      format: 'umd'
    }
  ],
  external: ['countup.js'],
  plugins: [
    eslint(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  watch: {
    include: 'src/**'
  }
}
