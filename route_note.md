# 网卡配置

## windows配置

需求: 假如现在有两个网卡, 一个是192.168.9.1(注意：这里指的是网关), 这个网卡用于内网连接, 另一个192.168.50.1(同样是网关), 这个网卡用于外网连接.

### 添加路由

将`10.0.0.0/24`的流量路由到`192.168.9.1`

`route -p add 10.0.0.0 mask 255.255.255.0 192.168.9.1`

将其他流量(外网)的流量路由到`192.168.50.1`

`route -p add 0.0.0.0 mask 255.255.255.0 192.168.50.1`

# 默认情况下，使用 route add 命令添加的路由只在当前会话中生效。若想让配置在系统重启后依然有效，需添加 -p 参数.

### 验证路由

`route print`



## linux

### 查看路由

`ip addr show`

### 添加路由

`sudo ip route add 10.0.0.0/24 via 172.168.20.4 dev wlan0`

这里假设`wlan0`是分配给`172.168.20.4`的网卡接口

### 验证路由是否添加成功

`ip route show`

# 2024.12.3 更新内容: 树莓派设置网卡优先级, 设置自启动程序

修改dhcpcd.conf文件
输入命令
`sudo nano /etc/dhcpcd.conf`

在最后添加以下代码:
interface wlan0
metric 200

interface eth0
metric 300

这里的metric指的是优先级, metric值越小, 优先级越大

设置自启动程序
在`/home/user/.config`创建autostart文件夹

输入内容

```
[Desktop Entry]
Type=Application
Name=名称
Exec=chromium-browser --kiosk "对应需要打开的url"
```
这里的需求是全屏打开某url页面

重启生效


