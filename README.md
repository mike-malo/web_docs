# web_docs

一些在开发过程中发现需要记录的笔记

1.使用`hbuilderx`创建`vue web`项目后，在`vite.config.js`文件中的`defineConfig`里面添加以下内容：
`base: "./",`

添加完以后完整的`vite.config.js`文件为:

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [vue()]
})
```

