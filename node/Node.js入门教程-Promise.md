## 了解 Javascript Promise


Promise 通常被定义为 最终会变为可用值的代理。

Promise 是一种处理异步代码（而不会陷入回调地狱）的方式。

异步函数 在底层使用了 promise，因此了解 promise 的工作方式是了解 async 和 await 的基础。

### 创建 promise & 消费 promise

```javascript
const fs = require('fs');
const getFile = (fileName) => {
  // 创建 promise
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    })
  })
}

// 消费 promise
getFile('/etc/.passwd')
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

### 链式 promise 的示例

```javascript
const status = response => {
  if (response.statue >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
}

const json = response => response.json();

fetch('/todos.json')
  .then(status) // 注意，`status` 函数实际上在这里被调用，并且同样返回 promise，
  .then(json) // 这里唯一的区别是的 `json` 函数会返回解决时传入 `data` 的 promise
  .then(data => { // 这是 `data` 会在此处作为匿名函数的第一个参数的原因。
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  })
```

### 处理错误

当 promise 链中的任何内容失败并引发错误或拒绝 promise 时，则控制权会转到链中最近的 catch() 语句。

```javascript
new Promise((resolve, reject) => {
  throw new Error('错误');
}).catch(err => {
  console.error(err);
});

new Promise((resolve, reject) => {
  reject('错误');
}).catch(err => {
  console.error(err);
});
```

#### 级联错误

如果在 catch() 内部引发错误，则可以附加第二个 catch() 来处理，依此类推。

```javascript
new Promise((resolve, reject) => {
  throw new Error('错误')
})
  .catch(err => {
    throw new Error('新错误');
  })
  .catch(err => {
    console.log(err);
  })
```



