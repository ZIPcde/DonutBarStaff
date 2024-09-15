// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: 'http://51.250.115.233:3000', // Адрес вашего backend (сервер Express)
        changeOrigin: false,
        pathRewrite: { '^/api': '' } // Переписывает /api в URL запроса
      }
    }
  }
})
