## 异步编程与回调

### 编程语言中的异步性

计算机在设计上是异步的。

异步意味着事情可以独立于主程序流而发生。

程序在内部会使用中断，一种被发送到处理器以获取系统关注的信号。

程序是异步的且会暂停执行直到需要关注，这使得计算机可以同时执行其他操作。 当程序正在等待来自网络的响应时，则它无法在请求完成之前停止处理器。

### Javascript

JavaScript 默认情况下是同步的，并且是单线程的。 这意味着代码无法创建新的线程并且不能并行运行。

但是 JavaScript 诞生于浏览器内部，一开始的主要工作是响应用户的操作，例如 onClick、onMouseOver、onChange、onSubmit 等。 使用同步的编程模型该如何做到这一点？

答案就在于它的环境。 浏览器通过提供一组可以处理这种功能的 API 来提供了一种实现方式。

更近点，Node.js 引入了非阻塞的 I/O 环境，以将该概念扩展到文件访问、网络调用等。

### 回调


回调是一个简单的函数，会作为值被传给另一个函数，并且仅在事件发生时才被执行。 之所以这样做，是因为 JavaScript 具有顶级的函数，这些函数可以被分配给变量并传给其他函数（称为高阶函数）。


### 处理回调中的错误

如何处理回调的错误？ 一种非常常见的策略是使用 Node.js 所采用的方式：任何回调函数中的第一个参数为错误对象（即错误优先的回调）。

如果没有错误，则该对象为 null。 如果有错误，则它会包含对该错误的描述以及其他信息。

```javascript
fs.readFile('/name.json', (err,data) => {
  if (err !== null) {
    // do something
    return;
  }
  // no error, do something
})
```

### 回调的问题

回调适用于简单的场景。

复杂场景下，回调嵌套过深：

```javascript
window.addEventListener('load', () => {
  document.getElementById('button').addEventListener('click', () => {
    setTimeout(() => {
      items.forEach(item => {
        //你的代码在这里。
      })
    }, 2000)
  })
})
```

### 回调的替代方法

Promise(ES6) 和 Async/Await(ES2017)