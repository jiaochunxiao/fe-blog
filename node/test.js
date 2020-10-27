
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