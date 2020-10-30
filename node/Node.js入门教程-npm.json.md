# Npm

## Node.js入门教程-查看npm包安装版本.json

### 查看所有已安装的npm package（包括它们的依赖）的最新版本

```bash
$ npm list
node@1.0.0 /Users/xx/github/fe-blog/node
├─┬ chalk@4.1.0
│ ├─┬ ansi-styles@4.3.0
│ │ └─┬ color-convert@2.0.1
│ │   └── color-name@1.1.4
│ └─┬ supports-color@7.2.0
│   └── has-flag@4.0.0
├─┬ inquirer@7.3.3
│ ├─┬ ansi-escapes@4.3.1
│ │ └── type-fest@0.11.0
│ ├── chalk@4.1.0 deduped
│ ├─┬ cli-cursor@3.1.0
│ │ └─┬ restore-cursor@3.1.0
│ │   ├─┬ onetime@5.1.2
│ │   │ └── mimic-fn@2.1.0
│ │   └── signal-exit@3.0.3
│ ├── cli-width@3.0.0
│ ├─┬ external-editor@3.1.0
│ │ ├── chardet@0.7.0
│ │ ├─┬ iconv-lite@0.4.24
│ │ │ └── safer-buffer@2.1.2
│ │ └─┬ tmp@0.0.33
│ │   └── os-tmpdir@1.0.2
│ ├─┬ figures@3.2.0
│ │ └── escape-string-regexp@1.0.5
│ ├── lodash@4.17.20
│ ├── mute-stream@0.0.8
│ ├── run-async@2.4.1
│ ├─┬ rxjs@6.6.3
│ │ └── tslib@1.14.1
│ ├─┬ string-width@4.2.0
│ │ ├── emoji-regex@8.0.0
│ │ ├── is-fullwidth-code-point@3.0.0
│ │ └── strip-ansi@6.0.0 deduped
│ ├─┬ strip-ansi@6.0.0
│ │ └── ansi-regex@5.0.0
│ └── through@2.3.8
├── minimist@1.2.5
└── progress@2.0.3
```

### 查看全局安装的 package

```bash
npm list -g
```

### 仅查看顶层的 package

```bash
$ npm list --depth=0
node@1.0.0 /Users/xx/github/fe-blog/node
├── chalk@4.1.0
├── inquirer@7.3.3
├── minimist@1.2.5
└── progress@2.0.3
```

### 查看指定包的版本

```bash
$ npm list inquirer
node@1.0.0 /Users/xx/github/fe-blog/node
└── inquirer@7.3.3
```

也适用于安装的 package 的依赖：

```bash
$ npm list chalk
node@1.0.0 /Users/xx/github/fe-blog/node
├── chalk@4.1.0
└─┬ inquirer@7.3.3
  └── chalk@4.1.0  deduped
```

### 查看npm 上 package 的最新可用版本

npm view [package.name] version

```bash
$ npm view chalk version
4.1.0
```

## Node.js入门教程-安装npm包的旧版本.json

可以使用 @ 语法来安装 npm 包的旧版本

```bash
npm install <package>@<version>
```

列出 npm包的 所有的版本

```bash
npm view <package> versions
```

## 将所有 Node.js 依赖的包更新到最新版本

如果有新的次版本或补丁版本，并且输入了 npm update，则已安装的版本会被更新，并且 package-lock.json 文件会被新版本填充。

```bash
npm update
```
但是 npm update 对于主版本更新，是无效的。主版本永远不会被这种方式更新，因为主版本通常会引入重大更新，npm 希望为你的项目减少麻烦。

若要将所有包更新到新的主版本，则全局安装 npm-check-updates：

```bash
npm install -g npm-check-updates
```
然后运行：
```bash
ncu -u
```

这会升级 package.json 文件的 dependencies 和 devDependencies 中的所有版本，以便 npm 可以安装新的主版本。

现在可运行更新了：
```bash
npm update
```

## 使用npm的语义版本控制

npm 包的语义控制版本，也很简单，所有版本有三个部分： x.y.z

+ 第一个数字是主版本
+ 第二个数字是次版本
+ 第三个数字是补丁版本

当发布新的版本时，请遵循以下规则：
+ 当进行不兼容的API更改时，升级主版本
+ 当以向后兼容的方式添加功能时，则升级次版本
+ 当进行向后兼容的缺陷修复时，则升级补丁版本

npm 设置了一些规则，可用于在 package.json 文件中选择将要 package 更新到的版本：
+ ^

```
1.2.x := >= 1.2.0 < 2.0.0
^1.2.3 := >= 1.2.3 < 2.0.0
^0.2.3 := >= 0.2.3 < 0.3.0
^0.0.3 := >= 0.0.3 < 0.0.4
```

+ ~

```
~1.2.3 := >= 1.2.3 < 1.(2+1).0 := >= 1.2.3 < 1.3.0
~1.2 :=  >= 1.2.0 < 1.(2+1).0 := >= 1.2.0 < 1.3.0(same as 1.2.x)
~1 := >= 1.0.0 < (1+1).0.0 := >= 1.0.0 < 2.0.0
~0.2.3 := >= 0.2.3 < 0.(2+1).0 := >= 0.2.3 < 0.3.0>
```

+ \> 接受高于指定版本的任何版本
+ \>= 接受等于或高于指定版本的任何版本
+ < 接受小于指定版本的任何版本
+ <= 接受小于等于指定版本的任何版本
+ = 接受确切版本
+ \- 接受一定范围的版本。 如： 2.1.0 - 2.6.2
+ || 组合集合，如 < 2.1 || > 2.6

## 卸载 npm package

卸载之前本地的安装的package，从项目根目录下运行：
```
npm uninstall <package>
```
如果使用 -S 或 --save 标志，则此操作还会移除 package.json 文件中的引用。

如果npm包是开发依赖项（列出在package.json 中的 devDependencies中），则必须使用 -D 或 --save-dev 从文件中移除。

```
npm uininstall -S <package>
npm uninstall -D <package>
```

如果该软件包是全局安装的，则需要添加 -g 或 --global 标志：

```
npm uninstall -g <packagenpm>
```

## Node.js包运行器 npxnpxnpcowsay

运行 npx commandname 会自动在项目的 node_modules文件夹中找到命令的正确引用，而无需知道确切的路径，也不需要在全局和用户的路径中安装npm 包。

使用 @ 指定 node 版本，并将其与node npm 包组合使用，有助于避免使用 nvm之类的工具或其他 Node.js 版本管理工具。

直接从 URL运行任意代码片段， npx 并不限制使用 npm 仓库发布的包，可以运行位于github gist中的代码。
```
npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
```

**参考**

1. [node.js入门教程](http://nodejs.cn/learn)
2. [semver](https://docs.npmjs.com/cli/v6/using-npm/semver)
