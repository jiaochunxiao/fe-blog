## React API

### React 顶层API

#### 概览

##### 组件

> 使用 React 组件可以将 UI 拆分为独立且复用的代码片段，每部分都可独立维护。你可以通过子类 React.Component 或 React.PureComponent 来定义 React 组件。

+ React.Component
+ React.PureComponent


React 组件也可以被定义为可被包装的函数:
+ React.memo

##### 创建React元素

> 我们建议使用 JSX 来编写你的 UI 组件。每个 JSX 元素都是调用 React.createElement() 的语法糖。一般来说，如果你使用了 JSX，就不再需要调用以下方法。

+ createElement()
+ createFactory()

##### 转换元素

React 提供了几个用于操作元素的 API：

+ cloneElement()
+ isValidElement()
+ React.Children

##### Fragments

React 还提供了用于减少不必要嵌套的组件。
+ React.Fragment

##### Refs

+ React.createRef
+ React.forwardRef

##### Suspense

Suspense 使得组件可以“等待”某些操作结束后，再进行渲染。**目前，Suspense 仅支持的使用场景是：通过 React.lazy 动态加载组件。**它将在未来支持其它使用场景，如数据获取等。

+ React.lazy
+ React.Suspense

##### Hook

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

+ 基础 Hook
  + useState
  + useEffect
  + useContext
+ 额外的 Hook
  + useReducer
  + useCallback
  + useMemo
  + useRef
  + useImperativeHandle
  + useLayoutEffect
  + useDebugValue


### 参考

#### React.Component
```jsx
class Greeting extends React.Compomnent {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

#### React.PureComponent

React.PureComponent 与 React.Component 很相似。**两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。**

如果赋予 React 组件相同的 props 和 state，render() 函数会渲染相同的内容，那么在某些情况下使用 React.PureComponent 可提高性能。

> React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。仅在你的 props 和 state 较为简单时，才使用 React.PureComponent，或者在深层数据结构发生变化时调用 forceUpdate() 来确保组件被正确地更新。你也可以考虑使用 immutable 对象加速嵌套数据的比较。
>
> 此外，React.PureComponent 中的 shouldComponentUpdate() 将跳过所有子组件树的 prop 更新。因此，请确保所有子组件也都是“纯”的组件。

#### React.memo

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用props渲染 */
})
```

React.memo 为高阶组件。

