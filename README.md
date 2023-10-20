# POST请求



本次数据提交使用git提交数据到分支，备注：

1.使用`git bash here`打开git命令行窗口

2.使用`git init`初始化当前需要提交代码的文件夹根目录

3.使用`git add file`添加需要提交的文件, 例如： `git add index.html`

4.使用git commit - m "本次提交数据的说明(备注)" , 注意: 在git中, 每次提交代码, 都要写commit message(提交代码), 否则就不允许提交.

5.注意: 如需提交代码到远程新分支, 可以按照以下步骤操作:

​    1.首先创建本地分支, 使用`git branch 分支名`, 例如: `git branch template`

​    2.提交代码到其他分支, 使用`git push -u origin 分支名`, 例如: `git push -u origin template`, 此时会自动在远程创建分支, 并将代码提交到新分支.

`git rm 文件` 注意: 本地中该文件会被删除

`git rm -r 文件夹` 注意: 删除文件夹

`git commit -m '说明'` 添加提交说明

`git push` 注意: 查看命令行末尾的内容(分支名)

### 只删除缓冲区中的对应部分

`git rm --cached 文件` 注意: 本地中该文件不会被删除

`git rm -r --cached 文件夹` 注意: 删除的是文件夹
