# 网卡配置

## windows配置

需求: 假如现在有两个网卡, 一个是172.168.20.4, 这个网卡用于内网连接, 另一个192.168.50.18, 这个网卡用于外网连接.

### 添加路由

将`10.0.0.0/24`的流量路由到`172.168.20.4`

`route add 10.0.0.0 mask 255.255.255.0 172.168.20.4`

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



## 示例配置文件(linux持久化设置)

编辑netplan配置文件(通常位于`/etc/netplan/`目录下, 以`.yaml`结尾:

`sudo nano /etc/netplan/01-netcfg.yaml`

添加一下内容

```yaml
network:
	version: 2
	ethernets:
		wlan0:
			dhcp4: true
			routes: 
				- to: 10.0.0.0/24
				via: 172.168.20.4
				on-link: true
```

### 应用配置

`sudo netplan apply`

