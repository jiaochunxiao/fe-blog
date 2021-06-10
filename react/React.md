## React

### JSX

#### JSX 防止注入攻击

React DOM在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

### 元素渲染

元素是构成 React 应用的最小砖块。

与浏览器的 DOM 元素不同，**React 元素是创建开销极小的普通对象**。React DOM 会负责更新 DOM 来与 React 元素保持一致。

React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。

### 组件&props

所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

**React 如何区分 Class组件 和 Function组件？**
一般的方式是借助 typeof 和 Function.prototype.toString 来判断当前是不是 class，如下：
```javascript
function isClass(func) {
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func));
}
```
但是这个方式有它的局限性，因为如果用了 babel 等转换工具，将 class 写法全部转为 function 写法，上面的判断就会失效。

React 区分 Class组件 和 Function组件的方式很巧妙，由于所有的类组件都要继承 React.Component，所以只要判断原型链上是否有 React.Component 就可以了：

```javascript
AComponent.prototype instanceof React.Component
```

### State & 生命周期

#### 正确使用 State

+ 不要直接修改 State
+ State 的更新可能是异步的

出于性能考虑，React可能会把多个setState() 调用合并成一个调用。
因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

```javascript
// wrong
this.setState({
  counter: this.state.counter + this.props.increment.
})
```

要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```javascript
// Correct
this.setState((state, props) => {
  counter: state.counter + props.increment,
})
```
+ State 的更新会被合并

**setState 是异步还是同步？**

+ 合成事件中是异步
+ 钩子函数中的是异步
+ 原生事件中是同步
  + > 原生事件是指非react合成事件，原生自带的事件监听 addEventListener ，或者也可以用原生js、jq直接 document.querySelector().onclick 这种绑定事件的形式都属于原生事件。
+ setTimeout中是同步


### 事件处理



*参考：*
+ [你真的理解setState吗？](https://juejin.cn/post/6844903636749778958)

