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

**参考**

1. [node.js入门教程](http://nodejs.cn/learn)
