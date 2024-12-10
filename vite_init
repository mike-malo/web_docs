'创建vite项目'

输入`npm create vite@latest` 创建vite项目

进入项目目录, `npm i` 安装依赖

安装文件路径插件
`npm install --save-dev @types/node`

配置`vite.config.ts`文件
```
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import { resolve } from 'path'

  const pathResolve = (dir: string): any => {
    return resolve(__dirname, ".", dir)
  }

  const alias: Record<string, string> = {
    '@': pathResolve("src")
  }
  export default defineConfig({
    plugins: [vue()],
    resolve: {
      alias
    }
  })
```

配置tsconfig.json文件
在compilerOptions中配置
```
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*
      ],
    }
```

开始配置路由
安装路由`npm install vue-router`

在src下创建routes文件夹和views文件夹
routes文件夹创建index.ts, views文件夹创建one.vue, two.vue这两个页面

index.ts内容:
```
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/one.vue')
        },
        {
            path: '/two',
            name: 'two',
            component: () => import('@/views/two.vue')
        }
    ]
})
// 导出
export default router
```

main.ts中引入:
```
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/routes/index'
const app = createApp(App)
app.use(router)
app.mount('#app')
//这里稍微整理了一下代码 可以不按照这种写法，直接引入你的index.ts就好
//如果不明白也可直接复制
```

在app.vue中的template加入
`<router-view></router-view>`

one页面:
```
<template>
    <div>
        <p>这是one页面</p>
        <button @click="show">前往two页面</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // 引入useRouter
const router = useRouter(); // 调用useRouter
const show = () => {
    router.push('/two'); // 跳转至two页面
};
</script>
```

two页面:
```
<template>
    <div>
        <p>这是two页面</p>
        <button @click="show">前往one页面</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // 引入useRouter
const router = useRouter(); // 调用useRouter
const show = () => {
    router.push('/'); // 跳转至two页面
};
</script>
```

测试
