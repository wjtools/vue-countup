module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }]
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  env: {
    test: {
      plugins: ['@babel/plugin-proposal-class-properties'],
      presets: ['@babel/preset-env']
    }
  }
}
