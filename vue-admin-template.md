# vue-web20230810笔记:

## 以下是项目开发过程中遇到的问题, 记录下来, 方便日后查阅和复习.

使用vue-cli创建项目时,
在vue-config.js中配置以下内容:

```
const { defineConfig } = require('@vue/cli-service')
    module.exports = defineConfig({
    trainspileDependencies: true,publicPath: './'
})
```

## 关于vue-admin-template, 以下是使用教程

1. 首先需要安装node环境, 安装完node环境后电脑自带node和npm命令, 截止编写此笔记时为止, 笔者使用的node版本为v16.20.0, npm版本为9.8.1
2. 安装完node环境后, 还需要安装git环境, 安装完git环境后, 可以使用`git bash`功能. 在github搜索vue-admin-template项目, 查看`README.md`文档.
3. 使用git拉取整个项目到本地`git clone https://github.com/PanJiaChen/vue-admin-template.git`
4. 使用`cd vue-admin-template`进入目录.
5. 使用`npm install`自动安装依赖. 目前在win7系统中无法正常安装依赖.
6. 安装完依赖后, 使用`npm run dev`命令启动本地服务器运行.
7. 可以使用`npm run build:stage`进行项目构建, 构建完的项目可以放到服务器中运行例如:
