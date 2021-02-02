## mongodb

### 使用docker运行mongo

+ 拉取镜像

```
docker pull mongo:latest
```

+ 运行容器

```
docker run -itd --name mongo -p 27017:27017 mongo --auth
```

+ 创建用户

```
docker exec -it mongo mongo admin
MongoDB shell version v4.4.3
connecting to: mongodb://127.0.0.1:27017/admin?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("9359dc63-bc8e-4a5f-98a0-0838c9d402ff") }
MongoDB server version: 4.4.3
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	https://docs.mongodb.com/
Questions? Try the MongoDB Developer Community Forums
	https://community.mongodb.com
> db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});
Successfully added user: {
	"user" : "admin",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		},
		"readWriteAnyDatabase"
	]
}
> db.auth('admin', '123456')

```