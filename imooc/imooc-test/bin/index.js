#!/usr/bin/env node

const lib = require('imooc-test-lib');

// console.log(lib);

// console.log(lib.sum(1, 2));

// console.log('welcom imooc-test!!!');


// 注册一个命令 imooc-test init
const argv = require('process').argv;
console.log(argv);

const command = argv[2];
// console.log(argv[2]);

const options = argv.slice(3);

if (options.length > 1) {
    let [option, param] = options;
    console.log(option);
    option = option.replace('--', '');

    console.log(option, param);

    if (command) {
        if (lib[command]) {
            lib[command]({option, param});
        }
        else {
            console.log('command not found!');
        }
    }
    else {
        console.log('please input command!');
    }
}

// 实现参数解析 --version 和 init --name
if (command.startsWith('--') || command.startsWith('-')) {
    const globalOption = command.replace(/--|-/g, '');
    console.log(globalOption);
    if (globalOption === 'version' || globalOption === 'V') {
        console.log('1.0.0');
    }
}
