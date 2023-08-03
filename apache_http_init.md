开启apache服务器教程:

1.首先下载apache win端文件（httpd-2.4.57-win64-VS17.zip）

2.解压文件后的名称为httpd-2.4.57-win64-VS17, 将这个文件夹放在某个目录中, 例如放在D盘根目录.

3.修改D:\httpd-2.4.57-win64-VS17\Apache24\conf中的httpd.conf文件, 可以将这个文件拖到VSCode中进行编辑.

4.修改httpd.conf中的这一句: 

`Define SRVROOT "c:/apache"`

将末尾的路径修改成对应Apache的路径, 例如:

`Define SRVROOT "D:\httpd-2.4.57-win64-VS17\Apache24"`

修改完以后, 双击打开httpd-2.4.57-win64-VS17\Apache24\bin中的httpd.exe这个程序, 默认这个程序会弹出终端窗口, 不要关闭此窗口.

打开浏览器输入以下地址: 

`localhost` 如果可以看到It works!等内容, 说明apache服务器开启成功.

到此, 就算开启了apache服务器.
