# 使用IDEA创建javaweb项目

1.首先笔者使用的idea版本为IntelliJ IDEA 2020.1.4 (Ultimate Edition), 注意是Ultimate Edition, 否则无法直接创建web项目

2.具备此IDE环境后, 新建项目, 选择Java Enterprise, 选择SDK(默认1.8), 选择Java EE version(这里默认是Java EE 8), 选择Application Server(Tomcat 8.5.90), 勾选Web Application, 点击Next, 这里是template界面, 点击Next跳过, 设置project name后点击finish后完成创建项目.

3.创建项目后, 包含两个文件夹, src和web, 其中web中包含WEB-INF文件夹和index.jsp文件, WEB-INF文件夹中包含web.xml文件.

# 使用Servlet

1.创建classes和lib文件夹, classes用于存放编译后输出的class文件, lib用于存放第三方jar包,

## 配置classes文件夹路径

File -> Project Structure -> Module -> Paths -> Use module compile output path

复制刚刚创建的classes绝对路径放到Output path和Test output path中.