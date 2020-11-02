
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

// const chalk = require('chalk');
// console.log(chalk.yellow('Hello world!'));

// const ProgressBar = require('progress');
// const bar = new ProgressBar('downloading [:bar]', { total: 100 });
// const timer = setInterval(() => {
//   bar.tick();
//   if (bar.complete) {
//     clearInterval(timer);
//   }
// }, 100);

// const inquirer = require('inquirer');

// const questions = [
//   {
//     type: 'input',
//     name: 'name',
//     message: "What's your name?"
//   },
//   {
//     type: 'input',
//     name: 'age',
//     message: 'How old are you?'
//   },
//   {
//     type: 'list',
//     name: 'address',
//     choices: [
//       {
//         value: 1,
//         name: 'Beijing',
//       },
//       {
//         value: 2,
//         name: 'Qingdao',
//       },
//       {
//         value: 3,
//         name: 'Jinan'
//       }
//     ],
//     message: 'Where are you live now?'
//   }
// ];

// inquirer.prompt(questions).then(answers => {
//   console.log('%o', answers);
// });

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

const http = require('http');
const port = 3000;
const hostname = "localhost";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('test\n', 'utf-8');
  res.end('Hello world!\n');
});

// const options = {
//   path: '/news/wap/fymap2020_data.d.json',
//   method: 'GET',
// };

// const req = http.request('http://interface.sina.cn', options, res => {
//   console.log(res.statusCode);
//   res.on('data', d => {
//     process.stdout.write(d);
//   });
// });

// req.on('error', error => {
//   console.error(error);
// });

// req.end();
const https = require('https');
const options = {
  path: '/?service=App.Bing.Randstory',
  method: 'POST',
};

const req = https.request('https://api.berryapi.net', options, res => {
  console.log(res.statusCode);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();

server.listen(port, () => {
  console.log(`Server is running at ${hostname}:${port}`);
});