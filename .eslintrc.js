module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/prettier'
  ],
  'rules': {
    'vue/max-attributes-per-line': ['error', {
      singleline: 3
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': ['error', {
      ignoreWhenEmpty: true,
      ignores: ['p', 'pre', 'textarea']
    }],
    'generator-star-spacing': 'off', // allow async-await
    quotes: ['error', 'single'], // 强制使用单引号
    semi: ['error', 'never'], // 强制结尾不使用分号
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
