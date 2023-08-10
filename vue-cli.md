使用vue-cli创建项目时,
编辑根目录中的vue-config.js,
配置一下内容:
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './'
})
