// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000', // Используем переменную окружения
        changeOrigin: false,
        pathRewrite: { '^/api': '' } // Переписывает /api в URL запроса
      }
    }
  }
})
