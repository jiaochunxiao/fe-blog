process.on('message', msg => {
  console.log('子进程收到来自主进程的信息：', msg);
});

process.send('Hey! 主进程');
