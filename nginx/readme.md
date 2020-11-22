## nginx

### 基本概念

#### 正向代理 & 反向代理


#### 负载均衡


### nginx 常用命令

+ nginx -v 查看版本

```bash
root@c598124ca7bf:/# nginx -v
nginx version: nginx/1.19.4
```

+ nginx -s stop 关闭

关闭 nginx

+ nginx -s reload 重加载

改变配置文件后，重新启动

### nginx配置文件

查找位置：nginx -t

#### nginx配置构成

+ 全局块

从配置文件开始到events之间的模块。配置

```bash
work_process
```

+ events

events 主要影响 nginx 服务器与用户网络的链接

+ http

nginx中配置最频繁的部分。

http分文全局块，server 块。