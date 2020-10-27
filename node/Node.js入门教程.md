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

