## Node.js入门教程

[Node.js入门教程](http://nodejs.cn/learn)

### 如何使用 Node.js REPL

REPL(Read-Eval-Print-Loop)，交互式顶层构件，是一个简单的、交互式的变成环境，也能指代命令行模式。


#### 使用tab键自动补全

在编写代码时，如果按下 tab 键，则 REPL 会尝试自动补全所写的内容，以匹配已定义或预定义的变量。


#### _ 特殊变量

如果在某些代码之后输入 _，则会打印最后一次操作的结果。

#### 点命令

REPL 有一些特殊的命令，所有这些命令都以点号 . 开头。它们是：

|命令|描述|
|---|---|
|.help|显示点命令的帮助。|
|.editor|启用编辑器模式，可以轻松地编写多行 JavaScript 代码。当处于此模式时，按下 ctrl-D 可以运行编写的代码。|
|.break|当输入多行的表达式时，输入 .break 命令可以中止进一步的输入。相当于按下 ctrl-C。|
|.clear|将 REPL 上下文重置为空对象，并清除当前正在输入的任何多行的表达式。|
|.load:|加载 JavaScript 文件（相对于当前工作目录）。|
|.save|将在 REPL 会话中输入的所有内容保存到文件（需指定文件名）。|
|.exit|退出 REPL（相当于按下两次 ctrl-C）。|

如果 REPL 能判断出是否正在输入多行的语句，则无需调用 .editor。

#### Node.js 从命令行接收参数

获取参数值的方法是使用 Node.js 中内置的 process 对象。

它公开了 argv 属性，该属性是一个包含所有命令行调用参数的数组。

第一个参数是 node 命令的完整路径。

第二个参数是正被执行的文件的完整路径。

所有其他的参数从第三个位置开始。

可以通过创建一个排除了前两个参数的新数组来仅获取其他的参数：

```javascript
const args = process.argv.slice(2);
```

最好的方法是使用 [minimist](https://www.npmjs.com/package/minimist) 库，该库有助于处理参数：

```javascript
// test.js
const args = require('minimist')(process.argv.slice(2));
console.log(args);

// 命令行执行
node test.js -i ./test -o ./test --in=test --out=test
// { _: [], i: './test', o: './test', in: 'test', out: 'test' }
```

### 使用 Node.js 输出到命令行

#### 使用控制台模块的基础输出

```javascript
console.log('我的%s已经%d岁', '🐈', 2);
```

+ %s 格式化变量为字符串
+ %d 格式化变量为数字
+ %i 格式化变量为其整数部分
+ %o 格式化变量为对象

#### 清空控制台

```javascript
console.clear()
```

#### 元素计数

```javascript
console.count()
```

#### 打开堆栈踪迹

```javascript
console.trace()
```

#### 计算耗时

```javascript
function test() {
  let n = 100000;
  while(n > 0) {
    n--;
  }
}

function testTime() {
  console.time('test()');
  test();
  console.timeEnd('test()');
}
testTime();
```

#### stdout & stderr

console.log 非常适合在控制台中打印消息。 这就是所谓的标准输出（或称为 stdout）。
console.error 会打印到 stderr 流。
它不会出现在控制台中，但是会出现在错误日志中。

### 在 Node.js 中从命令行接收输入

推荐 npm 包： [inquirer](https://github.com/SBoudrias/Inquirer.js)

### 使用 exports 从 Node.js 文件中公开功能

module.exports 和 export 之间有什么区别？

前者公开了它指向的对象。 后者公开了它指向的对象的属性。

### package.json 指南

[package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json)

对于应用程序，package.json 文件中的内容没有固定的要求。 唯一的要求是必须遵守 JSON 格式，否则，尝试以编程的方式访问其属性的程序则无法读取它。

选取了一个典型的package.json实例，[vue](https://github.com/vuejs/vue)仓库的package.json:

```json
{
  "name": "vue",
  "version": "2.6.12",
  "description": "Reactive, component-oriented view layer for modern web interfaces.",
  "main": "dist/vue.runtime.common.js",
  "module": "dist/vue.runtime.esm.js",
  "unpkg": "dist/vue.js",
  "jsdelivr": "dist/vue.js",
  "typings": "types/index.d.ts",
  "files": [
    "src",
    "dist/*.js",
    "types/*.d.ts"
  ],
  "sideEffects": false,
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev",
    "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
    "dev:test": "karma start test/unit/karma.dev.config.js",
    "dev:ssr": "rollup -w -c scripts/config.js --environment TARGET:web-server-renderer",
    "dev:compiler": "rollup -w -c scripts/config.js --environment TARGET:web-compiler ",
    "dev:weex": "rollup -w -c scripts/config.js --environment TARGET:weex-framework",
    "dev:weex:factory": "rollup -w -c scripts/config.js --environment TARGET:weex-factory",
    "dev:weex:compiler": "rollup -w -c scripts/config.js --environment TARGET:weex-compiler ",
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build -- weex",
    "test": "npm run lint && flow check && npm run test:types && npm run test:cover && npm run test:e2e -- --env phantomjs && npm run test:ssr && npm run test:weex",
    "test:unit": "karma start test/unit/karma.unit.config.js",
    "test:cover": "karma start test/unit/karma.cover.config.js",
    "test:e2e": "npm run build -- web-full-prod,web-server-basic-renderer && node test/e2e/runner.js",
    "test:weex": "npm run build:weex && jasmine JASMINE_CONFIG_PATH=test/weex/jasmine.js",
    "test:ssr": "npm run build:ssr && jasmine JASMINE_CONFIG_PATH=test/ssr/jasmine.js",
    "test:sauce": "npm run sauce -- 0 && npm run sauce -- 1 && npm run sauce -- 2",
    "test:types": "tsc -p ./types/test/tsconfig.json",
    "lint": "eslint src scripts test",
    "flow": "flow check",
    "sauce": "karma start test/unit/karma.sauce.config.js",
    "bench:ssr": "npm run build:ssr && node benchmarks/ssr/renderToString.js && node benchmarks/ssr/renderToStream.js",
    "release": "bash scripts/release.sh",
    "release:weex": "bash scripts/release-weex.sh",
    "release:note": "node scripts/gen-release-note.js",
    "commit": "git-cz"
  },
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node scripts/verify-commit-msg.js"
  },
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "git add"
    ]
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/vuejs/vue.git"
  },
  "keywords": [
    "vue"
  ],
  "author": "Evan You",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/vuejs/vue/issues"
  },
  "homepage": "https://github.com/vuejs/vue#readme",
  "devDependencies": {
    "@babel/core": "^7.0.0",
    "@babel/plugin-proposal-class-properties": "^7.1.0",
    "@babel/plugin-syntax-dynamic-import": "^7.0.0",
    "@babel/plugin-syntax-jsx": "^7.0.0",
    "@babel/plugin-transform-flow-strip-types": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
    "@babel/register": "^7.0.0",
    "@types/node": "^12.12.0",
    "@types/webpack": "^4.4.22",
    "acorn": "^5.2.1",
    "babel-eslint": "^10.0.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^8.0.4",
    "babel-plugin-istanbul": "^5.1.0",
    "babel-plugin-transform-vue-jsx": "^4.0.1",
    "babel-preset-flow-vue": "^1.0.0",
    "buble": "^0.19.3",
    "chalk": "^2.3.0",
    "chromedriver": "^2.45.0",
    "codecov": "^3.0.0",
    "commitizen": "^2.9.6",
    "conventional-changelog": "^1.1.3",
    "cross-spawn": "^6.0.5",
    "cz-conventional-changelog": "^2.0.0",
    "de-indent": "^1.0.2",
    "es6-promise": "^4.1.0",
    "escodegen": "^1.8.1",
    "eslint": "^5.7.0",
    "eslint-plugin-flowtype": "^2.34.0",
    "eslint-plugin-jasmine": "^2.8.4",
    "file-loader": "^3.0.1",
    "flow-bin": "^0.61.0",
    "hash-sum": "^1.0.2",
    "he": "^1.1.1",
    "http-server": "^0.11.1",
    "jasmine": "^2.99.0",
    "jasmine-core": "^2.99.0",
    "karma": "^3.1.1",
    "karma-chrome-launcher": "^2.1.1",
    "karma-coverage": "^1.1.1",
    "karma-firefox-launcher": "^1.0.1",
    "karma-jasmine": "^1.1.0",
    "karma-mocha-reporter": "^2.2.3",
    "karma-phantomjs-launcher": "^1.0.4",
    "karma-safari-launcher": "^1.0.0",
    "karma-sauce-launcher": "^2.0.2",
    "karma-sourcemap-loader": "^0.3.7",
    "karma-webpack": "^4.0.0-rc.2",
    "lint-staged": "^8.0.0",
    "lodash": "^4.17.4",
    "lodash.template": "^4.4.0",
    "lodash.uniq": "^4.5.0",
    "lru-cache": "^5.1.1",
    "nightwatch": "^0.9.16",
    "nightwatch-helpers": "^1.2.0",
    "phantomjs-prebuilt": "^2.1.14",
    "puppeteer": "^1.11.0",
    "resolve": "^1.3.3",
    "rollup": "^1.0.0",
    "rollup-plugin-alias": "^1.3.1",
    "rollup-plugin-buble": "^0.19.6",
    "rollup-plugin-commonjs": "^9.2.0",
    "rollup-plugin-flow-no-whitespace": "^1.0.0",
    "rollup-plugin-node-resolve": "^4.0.0",
    "rollup-plugin-replace": "^2.0.0",
    "selenium-server": "^2.53.1",
    "serialize-javascript": "^3.1.0",
    "shelljs": "^0.8.1",
    "terser": "^3.10.2",
    "typescript": "^3.6.4",
    "webpack": "~4.28.4",
    "weex-js-runtime": "^0.23.6",
    "weex-styler": "^0.3.0",
    "yorkie": "^2.0.0"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

#### 主要属性简介

##### name ✨

```json
{
  "name": "vue"
}
```

设置 npm 包的名称。

一些规则：

+ 名称必须少于214个字符，且不能包含空格，只能包含小写字母、连字符（-）或下划线（_）。
+ 新包的名称不能有大写字母
+ 名称最终成为URL的一部分、命令行上的参数和文件夹名称。因此，名称不能包含任何非url安全字符。

一些tips:

+ 不要使用与 Node 核心模块相同的名称
+ 不要在名称中加入 js 或 node。
+ 名称可能作为参数传递给 require(), 因此它应该简短，但也具有合理的描述性。

#### author

 npm 包的作者

#### contributors

除作者外，该项目可以有一个或多个贡献者。此属性为数组结构。

#### version ✨

指定 npm 包的当前版本。

该属性遵循版本的语义版本控制记法，意味着该版本始终以3个数字表示： x.x.x

Version 必须能够被 [node-semver](https://github.com/npm/node-semver) 解析。具体规范参考[semver](https://docs.npmjs.com/cli/v6/using-npm/semver)。

```json
{
  "version": "2.6.12"
}
```

#### description ✨

对 npm 包的简短描述。它将被展示在 npm search, 这有助于开发者发现你的 package。

```json
{
  "description": "Reactive, component-oriented view layer for modern web interfaces."
}
```

#### keywords ✨

设置关键字，它是一个字符串数组。它将被列出在 npm search，这有助于开发者发现你的 package。

```json
{
  "keywords": [
    "vue"
  ]
}
```

#### homepage

设置 npm 包的主页，通常指向项目的readme。

```json
{
  "homepage": "https://github.com/vuejs/vue#readme"
}
```

#### bugs

项目的问题跟踪的 url 或应该报告问题的电子邮件地址。这些对遇到您的软件包问题的人很有帮助。最常见的和上面的 vue 的类似，指向项目的 issues。

```json
{
  "bugs": {
    "url" : "https://github.com/owner/project/issues",
    "email" : "project@hostname.com"
  }
}
```

#### licence ✨

指定软件的许可证。

```json
{
  "licence": "MIT"
}
```

最流行的六开源许可证： GPL、BSD、MIT、Mozilla、Apache和 LGPL。

具体区分参考[如何选择开源许可证？](http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)

#### funding

可以指定一个对象，其中包含一个URL，该URL提供有关帮助您的 package 开发的资金的最新信息（比较少看到😂），可以是一个字符串URL，也可以为数组:

```json
"funding": {
  "type" : "individual",
  "url" : "http://example.com/donate"
}

"funding": {
  "type" : "patreon",
  "url" : "https://www.patreon.com/my-account"
}

"funding": "http://example.com/donate"

"funding": [
  {
    "type" : "individual",
    "url" : "http://example.com/donate"
  },
  "http://example.com/donateAlso",
  {
    "type" : "patreon",
    "url" : "https://www.patreon.com/my-account"
  }
]
```

#### files

可选的 files 字段为一个文件模式数组，描述当你的 package 作为依赖被安装时要包含的选项。

```json
"files": [
    "src",
    "dist/*.js",
    "types/*.d.ts"
]
```

文件模式遵循与 .gitignore相近的语法，但是表达的意义想法，它是指包含一个文件、目录或者 glob模式。

省略该字段，将使其默认为 ["*"]，意味着它将包含所有文件。

您还可以在包的根目录或子目录中提供.npmignore文件，它将防止包含文件。在包的根目录下，它不会覆盖“files”字段，但在子目录中会覆盖。npmignore文件就像.gitignore一样工作。如果有一个.gitignore文件，并且丢失了.npmignore，那么.gitignore的内容将被使用。

包含在 "package.json#file" 中的文件，不能通过.npmignore或.gitignore排除。

#### main

设置 package 的入口。

当在应用程序中导入此 package 时，应用程序会在该位置搜索模块的导出。

```json
{
  "main": "dist/vue.runtime.common.js"
}
```

#### browserslist

如果你的 package 用户浏览器端，该字段用于说明，你的 package 支持的浏览器及其版本

```json
{
  "browserslist": [
    "Android >= 7",
    "IOS >= 11",
    "Safari >= 11",
    "Chrome >= 49",
    "Firefox >= 31",
    "Samsung >= 5"
  ]
}

// 以下配置说明需要支持使用率超过 %1的所有浏览器的最新的两个主版本，但不包含 IE8 及更低版本。
{
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```
#### scripts ✨

scripts 指定了运行脚本命令的 npm 命令行的缩写。

```json
{
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev",
    "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
    "dev:test": "karma start test/unit/karma.dev.config.js",
    "dev:ssr": "rollup -w -c scripts/config.js --environment TARGET:web-server-renderer"
  }
}
```

#### bin

bin项用来指定各个内部命令对应的可执行文件的位置。

```json
{
  "bin": {
    "someTool": "./bin/someTool.js"
  }
}
```
上面代码指定，someTool 命令对应的可执行文件为 bin 子目录下的 someTool.js。Npm会寻找这个文件，在node_modules/.bin/目录下建立符号链接。在上面的例子中，someTool.js会建立符号链接node_modules/.bin/someTool。由于node_modules/.bin/目录会在运行时加入系统的PATH变量，因此在运行npm时，就可以不带路径，直接通过命令来调用这些脚本。

因此，像下面这样的写法可以采用简写。
```json
{
  "scripts": {
    "start": "./node_modules/bin/someTool.js build"
  }
}
// 简写为
{
  "scripts": {
    "start": "someTool build"
  }
}
```
所有node_modules/.bin/目录下的命令，都可以用npm run [命令]的格式运行。在命令行下，键入npm run，然后按tab键，就会显示所有可以使用的命令。

#### config

config 对象可以用来设置 package 脚本中使用的配置参数。
比如，一个 package 有如下配置：

```json
{
  "name": "foo",
  "config": {
    "port": "8080"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```
然后，在 server.js 脚本中可引用 config字段的值：
```javascript
http
  .createServer(...)
  .listen(process.env.npm_package_config_port)

```
然用户可通过执行 npm config set foo:port 8001 来覆盖。

#### dependencies

dependencies 字段指定了项目运行依赖的模块。

该对象的各个成员分别有模块名和对应的版本组成，表示依赖模块及其版本范围。版本范围遵循[semver](https://docs.npmjs.com/cli/v6/using-npm/semver)

```json
{
  "devDependencies": {
    "browserify": "~13.0.0",
    "karma-browserify": "~5.0.1"
  }
}
```

请不要在依赖对象中放置测试用例或者转译器。

#### devDependencies

devDependencies 字段指定了项目开发所需要的模块。

该对象的各个成员分别有模块名和对应的版本组成，表示依赖模块及其版本范围。版本范围遵循[semver](https://docs.npmjs.com/cli/v6/using-npm/semver)

#### peerDependencies

该字段用来供插件指定去所需要的主工具的版本。

> peerDependencies的目的是提示宿主环境去安装满足插件peerDependencies所指定依赖的包，然后在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题。

举例，我们使用 element-ui, element-ui的 package.json中有如下配置：

```json
{
  "peerDependencies": {
    "vue": "^2.5.17"
  }
}
```
它要求宿主环境安装指定版本的 vue 版本。

#### private

如果设置为 true，则可以防止应用程序/软件包被意外发布到 npm 上。


#### engines

设置此 package 或 项目要运行的 Node.js 或其他命令的版本。

```json
{
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0",
    "yarn": "^0.13.0"
  }
}
```

**参考**

1. [node.js入门教程](http://nodejs.cn/learn)
2. [package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#version)
3. [package.json文件](https://javascript.ruanyifeng.com/nodejs/packagejson.html#toc4)
4. [探讨npm依赖管理之peerDependencies](https://www.cnblogs.com/wonyun/p/9692476.html)
