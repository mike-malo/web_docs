# 安装mockjs

首先, 使用npm安装mockjs

```npm install mockjs```

## 编写nodejs

```
// 导入Mock.js库
const Mock = require('mockjs');

// 使用Mock.js生成随机数据
const data = Mock.mock({
	'users|5-10': [{
		'id|+1': 1,
		'name': '@name',
		'age|18-50': 1,
		'email': '@email',
		'gender|1': ['男', '女']
	}]
});

console.log(JSON.stringify(data, null, 2));
```

