# **Docker学习**

## 安装Docker

```
$ sudo apt-get update
```

```
$ sudo apt-get install \
	apt-transport-https \
	ca-certificates \
	curl \
	gnupg \
	lsb-release
```

```
$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### 启动Docker

```
$ sudo systemctl enable docker
$ sudo systemctl start docker
```

### 测试Docker是否安装正确

``
$ docker run --rm hello-world
``

以上安装方法不确定, 自行判断

## Docker container (容器)

使用``$ docker run``命令自动启动容器

使用

```
$ docker container ls
```

命令查看容器信息(正在运行的容器)

使用

```
$ docker container ls -a
```

命令查看所有容器信息(无论是否正在运行)

使用

```
$ docke container prune
```

命令关闭所有容器

## 自行编译Docker

使用

```
$ docker-compose --version
```

查看docker-compose的版本信息

如果没有安装docker-compose, 推荐使用pip方式安装

### 使用PIP安装docker-compose

命令

```
$ sudo pip install -U docker-compose
```

## 使用docker-compose[重点]

1. 新建一个项目文件夹

2. 在这个文件夹新建一个app.py文件

   ​	使用命令``sudo vim app.py``

   ​	app.py内容:

   ​	

   ```python
   from flask import Flask
   from redis import Redis
   
   app = Flask(__name__)
   redis = Redis(host='redis', port=6379)
   
   @app.route('/')
   def hello():
       count = redis.incr('hits')
       return 'Hello World! 该页面已被访问 {} 次。\n'.format(count)
   
   if __name__ == "__main__":
       app.run(host="0.0.0.0", debug=True)
   ```

   

3. 编写Dockerfile文件, 内容

   ```dockerfile
   FROM python:3.6-alpine
   ADD . /code
   WORKDIR /code
   RUN pip install redis flask
   CMD ["python", "app.py"]
   ```

4. 编写docker-compose.yml文件, 内容

   ```yaml
   version: '3'
   services:
   
     web:
       build: .
       ports:
        - "5000:5000"
   
     redis:
       image: "redis:alpine"
   ```

5. 使用命令``$ docker-compose up``启动compose项目

6. 此时访问本地5000端口, 在浏览器打开``http://localhost:5000``, 如果正常运行compose的话, 每次刷新页面, 计数就会加1.

