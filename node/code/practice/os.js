const exec = require('child_process').exec;
const cmdStr = 'ls -l';
exec(cmdStr, (err, stdout, stderr) => {
  if (err) {
    console.error(`执行错误：${err}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  // console.log(stdout.toString().split(/\n/));
  const res = stdout.toString().split(/\n/);
  res.map((item, index) => {
    console.log(index)
    console.log(item.toString());
    const string = item.toString().split(/\s+/);
    console.log(string);
  })
  console.error(`stderr: ${stderr}`);
});


// function getIPAddress() {
//   const os = require('os');
//   // console.log(os);
//   const interfaces = require('os').networkInterfaces();
//   // console.log(interfaces);
//   for (const devName in interfaces) {
//       const iface = interfaces[devName];
//       for (let i = 0; i < iface.length; i++) {
//           const alias = iface[i];
//           if (alias.family.toLocaleLowerCase() === 'ipv4' && alias.address !== '127.0.0.1' && !alias.internal) {
//               return alias;
//           }
//       }
//   }
// }
// getIPAddress();


// const os = require('os');
// const cpus = os.cpus();
// console.log(os.platform());
// console.log(os.totalmem()/1024/1024/1024);
// console.log(os.freemem()/1024/1024/1024);
// console.log(os.userInfo());