# web_docs
一些在开发过程中发现需要记录的笔记


1.使用hbuilderx创建vue web项目后，在vite.config.js文件中的defineConfig里面添加以下内容：
base: "./",

添加完以后完整的vite.config.js文件为:

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/

export default defineConfig({

  base: "./",
 
  plugins: [vue()]
 
}) 
