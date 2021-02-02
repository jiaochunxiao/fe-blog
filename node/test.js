
// const args = require('minimist')(process.argv.slice(2));
// console.log(args);
// var fun1 = () => console.trace();
// var fun2 = () => fun1();
// fun2();


// function test() {
//   let n = 100000;
//   while(n > 0) {
//     n--;
//   }
// }

// function testTime() {
//   console.time('test()');
//   test();
//   console.timeEnd('test()');
// }

// testTime();

const chalk = require('chalk');
console.log(chalk.yellow('Hello world!'));

// const ProgressBar = require('progress');
// const bar = new ProgressBar('downloading [:bar]', { total: 100 });
// const timer = setInterval(() => {
//   bar.tick();
//   if (bar.complete) {
//     clearInterval(timer);
//   }
// }, 100);

const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?"
  },
  {
    type: 'input',
    name: 'age',
    message: 'How old are you?'
  },
  {
    type: 'list',
    name: 'address',
    choices: [
      {
        value: 1,
        name: 'Beijing',
      },
      {
        value: 2,
        name: 'Qingdao',
      },
      {
        value: 3,
        name: 'Jinan'
      }
    ],
    message: 'Where are you live now?'
  }
];

inquirer.prompt(questions).then(answers => {
  console.log('%o', answers);
});

// const p1 = new Promise((resolve, reject) => {
//   resolve({ name: 'promise'});
// }).catch(err => {
//   console.log('err 1');
// });

// p1.then(data => {
//   console.log(data);
//   throw new Error('throw error');
// }).catch(err => {
//   console.log('exceute');
//   console.error(err);
// }).catch(err => {
//   console.log('finally');
//   console.log(er);
// });

// const EventEmitter = require('events');
// const eventEmitter = new EventEmitter();

// eventEmitter.on('start', (number) => {
//   console.log(number);
// });

// eventEmitter.emit('start', 7);

// const http = require('http');
// const port = 3000;
// const hostname = "localhost";

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.write('test\n', 'utf-8');
//   res.end('Hello world!\n');
// });

// const options = {
//   path: '/news/wap/fymap2020_data.d.json',
//   method: 'GET',
// };

// const req = http.request('http://interface.sina.cn', options, res => {
//   console.log(res.statusCode);
//   let chunk = '';
//   res.on('data', d => {
//     chunk += d;
//   });
//   res.on('end', () => {
//     console.log(chunk);
//     console.log('end');
//   });
// });

// req.on('error', error => {
//   console.error(error);
// });

// req.end();
// // const https = require('https');
// // const options = {
// //   path: '/?service=App.Bing.Randstory',
// //   method: 'POST',
// // };

// // const req = https.request('https://api.berryapi.net', options, res => {
// //   console.log(res.statusCode);
// //   res.on('data', d => {
// //     process.stdout.write(d);
// //   });
// // });

// // req.on('error', error => {
// //   console.error(error);
// // });

// // req.end();

// server.listen(port, () => {
//   console.log(`Server is running at ${hostname}:${port}`);
// });

const p1 = new Promise((resolve, reject) => {
  reject('reject')
});

p1.then(resolve => {
  console.log(resolve);
}, reject => {
  console.log(reject);
  console.log('----------');
  throw Error({error: 'test'})
}).catch(err => {
  console.log('err');
  console.error(err.toString());
});

// function compareVersion(v1, v2) {
//   const v1arr = v1.split('.');
//   const v2arr = v2.split('.');
//   const len1 = v1arr.length;
//   const len2 = v2arr.length;
//   const max = len1 > len2 ? len1 : len2;
//   let i = 0;
//   for(; i < max; i++) {
//     const v1v = v1arr[i] ? parseInt(v1arr[i]) : 0;
//     const v2v = v2arr[i] ? parseInt(v2arr[i]) : 0;
//     if (v2v > v1v) {
//       return false;
//     }
//   }
//   return true;
// }

// console.log(compareVersion('1.0.1', '1.1.2'));
// console.log(compareVersion('0.0.1', '0.0.2'));
// console.log(compareVersion('1.1.0', '1.2.0'));
// console.log(compareVersion('1.2.1', '1.12.1'));
// console.log(compareVersion('1.1.12', '1.2'));

// function toNum(version) {
//   const versionArr = version.split('.');
//   const num_place = ['0000', '000', '00', '0', ''];
//   const len = versionArr.length;
//   for (let i = 0; i < len; i++) {
//     const itemLen = versionArr[i].length;
//     versionArr[i] = num_place[itemLen] + versionArr[i];
//   }
//   const res = versionArr.join('');
//   return res;
// };

// function compareVersion2(a, b) {
//   const version_a = toNum(a);
//   const version_b = toNum(b);
//   return version_a > version_b;
// }


// console.log(compareVersion2('1.0.1', '1.1.2'));
// console.log(compareVersion2('0.0.1', '0.0.2'));
// console.log(compareVersion2('1.1.0', '1.2.0'));
// console.log(compareVersion2('1.2.1', '1.12.1'));
// console.log(compareVersion2('1.1.12', '1.2'));


const value = 1;
function foo() {
  console.log(value);
}

function baz() {
  const value = 2;
  foo();
}

foo();

baz();
