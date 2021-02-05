## verdaccio

**部署注意事项**
+ verdaccio 容器内的 verdaccio 用户无法对宿主机进行写入操作，此时使用 npm adduser 无法完成添加，所以还需执行

```bash
sudo chown 10001:65533 ./conf/htpasswd
sudo chown -R 10001:65533 ./storage
```