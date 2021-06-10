import React from 'react';

export default class ClassDemo extends React.Component {
    render() {
        return <h1>ClassDemo!</h1>
    }
}

function isClass(func) {
    console.log(func.prototype instanceof React.Component);
    return typeof func === 'function'
        && /^class\s/.test(Function.prototype.toString.call(func));
}

console.log(isClass(ClassDemo));
