## Node.js事件触发器 EventEmitter

```javascript
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('start', (number) => {
  console.log(number);
});

eventEmitter.emit('start', 7);
```

EventEmitter 对象还公开了其他几个与事件进行交互的方法，例如：

+ once(): 添加单次监听器。
+ removeListener() / off(): 从事件中移除事件监听器。
+ removeAllListeners(): 移除事件的所有监听器。



