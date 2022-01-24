##

### 脚手架开发

```
#!/usr/bin/env node
#!/usr/bin/node
```
+ 第一种是在环境变量中查找 node
+ 第二种是直接执行 /usr/bin/ 目录下的 node


npm 安装某个包，如果当前目录存在同名的东西，会自动将软连连接到本地！

如果需要安装远程远程，只需离开当前目录，重新 npm install xxx

本地调试 npm link

在当前目录的上一级，执行 npm install -g xxx，也可以生成软连接，本地调试。

在本地调试依赖本地的其他包时，可现在被依赖包内执行npm link， 然后在项目目录下执行 npm link xxx，然后手动在项目package.json。制定依赖包的名称和版本。

接触本地依赖 npm unlink

#### 脚手架本地 link 标准流程

链接本地脚手架

```
cd your-cli-dir
npm link
```

链接本地库文件

```
cd your-lib-dir
npm link
cd your-cli-dir
npm link your-lib-dir
```

取消链接本地库文件

```
cd your-lib-dir
npm unlink
cd your-cli-dir
npm unlink your-lib-dir
```

理解 npm link
+ npm link your-lib: 将当前项目中的 node_modules 下指定的库文件链接到 node 全局 node_modules下的库文件
+ npm link: 将当前项目链接到 node 全局 node_modules 中作为一个库文件，并解析 bin 配置创建可执行文件

理解 npm unlink
+ npm unlink: 将当前项目从 node 全局 node_modules 中移除
+ npm unlink your-lib: 将当前项目中的库文件依赖移除


### lerna

lerna 是一个优化基于git + npm 的多package 项目的管理工具

优势：
+ 大幅减少重复操作
+ 提升操作的标准化



