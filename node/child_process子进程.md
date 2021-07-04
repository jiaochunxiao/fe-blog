## child_process子进程

child_process 模块提供了衍生子进程能力，此功能主要有child_process.spawn()函数提供。


```javascript
const {spawn} = require('child_process');

const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出，退出码: ${code}`);
});

```

默认情况下， stdin、 stdout 和 stderr 的管道会在父 Node.js 进程和衍生的子进程之间建立。 这些管道具有有限的（且平台特定的）容量。 如果子进程写入 stdout 时超出该限制且没有捕获输出，则子进程会阻塞并等待管道缓冲区接受更多的数据。 这与 shell 中的管道的行为相同。 **如果不消费输出，则使用 { stdio: 'ignore' } 选项**。

如果 options 对象中有 options.env.PATH 环境变量，则使用它来执行命令查找。 否则，则使用 process.env.PATH。

child_process.spawn() 方法会异步地衍生子进程，且不阻塞 Node.js 事件循环。 child_process.spawnSync() 函数则以同步的方式提供了等效的功能，但会阻塞事件循环直到衍生的进程退出或被终止。

child_process 模块提供了 child_process.spawn() 和 child_process.spawnSync() 的一些同步和异步的替代方法。 这些替代方法中的每一个都是基于 child_process.spawn() 或 child_process.spawnSync() 实现的。

+ child_process.exec(): 衍生 shell 并且在 shell 中运行命令，当完成时则将 stdout 和 stderr 传给回调函数。
+ child_process.execFile(): 类似于 child_process.exec()，但是默认情况下它会直接衍生命令而不先衍生 shell。
+ child_process.fork(): 衍生新的 Node.js 进程，并调用指定的模块，该模块已建立了 IPC 通信通道，可以在父进程与子进程之间发送消息。
+ child_process.execSync(): child_process.exec() 的同步版本，会阻塞 Node.js 事件循环。
+ child_process.execFileSync(): child_process.execFile() 的同步版本，会阻塞 Node.js 事件循环。


