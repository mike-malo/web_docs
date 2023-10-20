# 今日笔记10.4

提问的智慧

https://zhuanlan.zhihu.com/p/19779979



jquery.js的理念是Write less, Do more



easyui

https://www.jeasyui.net



书影博客

http://bookshadow.com/



git命令

https://www.eolink.com/news/post/5121.html



### jquery发送ajax请求

```js
$.ajax({
    async: false,
    url: 'test.php', // http请求的地址
    type: 'GET', // 请求的类型, 主要get和post
    data: {
    	'key': 'value' // 发送请求的数据, 格式为key和value
	},
    dataType: 'json', // 返回的数据的类型, 一般为json格式
    success: function(res) {
        // 请求成功执行的函数（回传函数）
        // res为返回的数据
    },
    error: function() {
        alert('错误') // 请求失败执行的函数
    }
})
```

### jquery点击事件

```js
$(".test").click(function() {
    // jq的点击事件执行函数
})
```

新建(Create) 读取(Read) 更新(Update) 删除(Delete) 的操作称为(CRUD)



戴兜blog

https://im.daidr.me/





MySQL数据库原理

https://relph1119.github.io/mysql-learning-notes/#/



JAVA知识体系

https://pdai.tech/md/db/sql-lan/sql-lan.html



| 操作符  |     说明     |
| :-----: | :----------: |
|    =    |     等于     |
|    <    |     小于     |
|    >    |     大于     |
|  <> !=  |    不等于    |
|  <=!>   |   小于等于   |
|  >=!<   |   大于等于   |
| BETWEEN | 在两个值之间 |
| IS NULL |   为NULL值   |



七天学会nodejs

https://nqdeng.github.io/7-days-nodejs/



## 今日笔记10.20

nodejs电子书

https://www.nodebeginner.org/index-zh-cn.html







