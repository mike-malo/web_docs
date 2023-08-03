hexo博客搭建教程：

前提条件：

1.首先需要有npm环境, 安装nodejs后自动安装npm环境

2.使用npm命令安装hexo, 输入以下命令:

`npm install -g hexo-cli`

安装完成后, 使用以下命令初始化博客文件夹: 

`hexo init blog`

这个命令中的blog为博客项目文件夹名称.

然后输入以下三行命令：

`hexo new test_my_site` 这个命令是新建一个文章（文章标题为test_my_site）

`hexo g` 这个命令是自动编译整个博客项目（生成静态页面）

`hexo s` 这个命令是在本地开启博客服务器, 默认端口为4000

执行完以上命令后，打开浏览器输入地址: 
`localhost:4000`
