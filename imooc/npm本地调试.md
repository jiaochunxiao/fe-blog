## 脚手架本地link标准流程

### 链接本地脚手架

```bash
cd your-cli-dir
npm link
```

### 链接本地库文件

```bash
cd your-lib-dir
npm link

cd your-cli-dir
npm link your-lib-dir

```

### 取消链接本地代码库

```bash
cd your-lib-dir
npm unlink
cd your-cli-dir
# link存在
npm unlink your-lib-dir
# link不存在
rm -rf node_modules
```

### 理解npm link

+ npm link your-lib: 将当前项目中的 node_modules 下指定的库文件链接 node 全局 node_modules 下的库文件
+ npm link: 将当前项目链接到 node 全局 node_modules 中作为一个库文件，并解析 bin 配置创建可执行文件

### 理解 npm unlink

+ npm unlink: 将当前项目从 node 全局 node_modules 中移除
+ npm unlink your-lib: 将当前项目中的库文件依赖移除

