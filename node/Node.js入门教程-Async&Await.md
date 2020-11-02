## Async && Await

异步函数是 promise 和生成器的组合，基本上，它们是 promise 的更高级别的抽象。 而 async/await 建立在 promise 之上。

### 为什么引入 async/await

它们减少了 promise 的样板，且减少了 promise 链条的“不破坏链条”的限制。

### 工作原理

异步函数会返回 promise:

```javascript
const doSomethingAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('do something'). 3000);
  });
};
```

当调用此函数时，则在前面加上 await，然后停止调用的代码就会停止直到 promise 被解决或被拒绝。注意： 客户端函数必须被定义为 async:

```javascript
const doSomething = async () => {
  console.log(await doSomethingAsync());
};
```

#### demo

```javascript
const doSomethingAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('做些事情'), 3000)
  })
}

const doSomething = async () => {
  console.log(await doSomethingAsync())
}

console.log('之前')
doSomething()
console.log('之后')
// 之前
// 之后
// 做些事情
```






