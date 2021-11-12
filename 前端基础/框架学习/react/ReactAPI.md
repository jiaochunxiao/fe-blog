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

如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

```jsx
function MyComponent(props) {
  /* 使用 props 渲染 */
}

function areEqual(prevProps, nextProps) {
   /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}

export default React.memo(MyComponent, areEqual);
```

**此方法仅作为性能优化的方式而存在。但请不要依赖它来“阻止”渲染，因为这会产生 bug。**

> 与 class 组件中 shouldComponentUpdate() 方法不同的是，如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值相反。

#### createElement()

```jsx
React.createElement(
  type,
  [props],
  [...children]
)
```

创建并返回指定类型的新 React 元素。其中的类型参数既可以是标签名字符串（如 'div' 或 'span'），也可以是 React 组件 类型 （class 组件或函数组件），或是 React fragment 类型。

使用 JSX 编写的代码将会被转换成使用 React.createElement() 的形式。如果使用了 JSX 方式，那么一般来说就不需要直接调用 React.createElement()。


#### cloneElement()

```jsx
React.cloneElement(
  element,
  [config],
  [...children]
)
```

以 element 元素为样板克隆并返回新的 React 元素。config 中应包含新的 props，key 或 ref。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。新的子元素将取代现有的子元素，如果在 config 中未出现 key 或 ref，那么原始元素的 key 和 ref 将被保留。


React.cloneElement() 几乎等同于：
```jsx
<element.type {...element.props} {...props}>{children}</element.type>
```

但是，这也保留了组件的 ref。这意味着当通过 ref 获取子节点时，你将不会意外地从你祖先节点上窃取它。相同的 ref 将添加到克隆后的新元素中。如果存在新的 ref 或 key 将覆盖之前的。

#### ~~createFacotry()~~
```jsx
React.createFactory(type)
```
返回用于生成指定类型 React 元素的函数。与 React.createElement() 相似的是，类型参数既可以是标签名字符串（像是 'div' 或 'span'），也可以是 React 组件 类型 （class 组件或函数组件），或是 React fragment 类型。

**此辅助函数已废弃，建议使用 JSX 或直接调用 React.createElement() 来替代它。**

#### isValidElement()
```jsx
React.isValidElement(object)
```
验证对象是否为 React 元素，返回值为 true 或 false。

#### React.Children

React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。

##### React.Children.map
```jsx
React.Children.map(children, function[(thisArg)])
```
在 children 里的每个直接子节点上调用一个函数，并将 this 设置为 thisArg。如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数。如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组。

> 如果 children 是一个 Fragment 对象，它将被视为单一子节点的情况处理，而不会被遍历。

##### React.Children.forEach

```jsx
React.Children.forEach(children, function[(thisArg)])
```
与 React.Children.map() 类似，但它不会返回一个数组。

##### React.Children.count
```jsx
React.Children.count(children)
```

返回 children 中的组件总数量，等同于通过 map 或 forEach 调用回调函数的次数。

##### React.Children.only
```jsx
React.Children.only(children)
```
**验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误。**

> React.Children.only() 不接受 React.Children.map() 的返回值，因为它是一个数组而并不是 React 元素。

##### React.Children.toArray
```jsx
React.Children.toArray(children)
```
将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。当你想要在渲染函数中操作子节点的集合时，它会非常实用，特别是当你想要在向下传递 this.props.children 之前对内容重新排序或获取子集时。

> React.Children.toArray() 在拉平展开子节点列表时，更改 key 值以保留嵌套数组的语义。也就是说，toArray 会为返回数组中的每个 key 添加前缀，以使得每个元素 key 的范围都限定在此函数入参数组的对象内。

#### React.Fragment

React.Fragment 组件能够在不额外创建 DOM 元素的情况下，让 render() 方法中返回多个元素。

```jsx
render() {
  <React.Fragment>
    some text.
    <h2>A heading</h2>
  </React.Fragment>
}
```

你也可以使用其简写语法 <></>。

#### React.createRef

React.createRef 创建一个能够通过 ref 属性附加到 React 元素的 ref。

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```

#### React.forwardRef

React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：

+ 转发 refs 到 DOM 组件
+ 在高阶组件中转发 refs

React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。

#### React.lazy

React.lazy() 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。

```jsx
// 这个组件是动态加载的
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

请注意，**渲染 lazy 组件依赖该组件渲染树上层的 <React.Suspense> 组件。这是指定加载指示器（loading indicator）的方式。**

#### React.Suspense

React.Suspense 可以指定加载指示器（loading indicator），以防其组件树中的某些子组件尚未具备渲染条件。目前，懒加载组件是 <React.Suspense> 支持的唯一用例：

```jsx
// 该组件是动态加载的
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // 显示 <Spinner> 组件直至 OtherComponent 加载完成
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```
请注意，lazy 组件可以位于 Suspense 组件树的深处——它不必包装树中的每一个延迟加载组件。最佳实践是将 <Suspense> 置于你想展示加载指示器（loading indicator）的位置，而 lazy() 则可被放置于任何你想要做代码分割的地方。

### React.Component

#### 概览

React 的组件可以定义为 class 或函数的形式。class 组件目前提供了更多的功能，这些功能将在此章节中详细介绍。如需定义 class 组件，需要继承 React.Component：

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
在 React.Component 的子类中有个必须定义的 render() 函数。本章节介绍其他方法均为可选。

**我们强烈建议你不要创建自己的组件基类。** 在 React 组件中，代码重用的主要方式是组合而不是继承。

#### 组件的生命周期

每个组件都包含 “生命周期方法”，你可以重写这些方法，以便于在运行过程中特定的阶段执行这些方法。

[组件的生命周期](img/lifecycle-react.png)

##### 挂载

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

+ constructor()
+ static getDerivedStateFromProps()
+ render()
+ componentDidMount()

*下述生命周期方法即将过时，在新代码中应该避免使用它们：*
*+ UNSAFE_componentWillMount()*

##### 更新

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

+ static getDerivedStateFromProps
+ shouldComponentUpdate()
+ render()
+ getSnapshotBeforeUpdate()
+ componentDidUpdate()

*注意:下述方法即将过时，在新代码中应该避免使用它们：*
*UNSAFE_componentWillUpdate()*
*UNSAFE_componentWillReceiveProps()*

##### 卸载

当组件从 DOM 中移除时会调用如下方法：

+ componentWillUnmount()

##### 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

+ static getDerivedStateFromError()
+ componentDidCatch()


#### 组件额外提供的API

+ setState()
+ forceUpdate()

#### class属性

+ defaultProps
+ displayName

#### 实例属性

+ props
+ state

### 参考

常用的生命周期方法

#### render()

render() 方法是 class 组件中唯一必须实现的方法。

当 render 被调用时，它会检查 this.props 和 this.state 的变化并返回以下类型之一：

+ React 元素。通常通过 JSX 创建。例如，<div /> 会被 React 渲染为 DOM 节点，<MyComponent /> 会被 React 渲染为自定义组件，无论是 <div /> 还是 <MyComponent /> 均为 React 元素。
+ 数组或 fragments。 使得 render 方法可以返回多个元素。
+ Portals。可以渲染子节点到不同的 DOM 子树中。
+ 字符串或数值类型。它们在 DOM 中会被渲染为文本节点
+ 布尔类型或 null。什么都不渲染。（主要用于支持返回 test && <Child /> 的模式，其中 test 为布尔类型。)

render() 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

如需与浏览器进行交互，请在 componentDidMount() 或其他生命周期方法中执行你的操作。保持 render() 为纯函数，可以使组件更容易思考。

> 如果 shouldComponentUpdate() 返回 false，则不会调用 render()

#### constructor()

```jsx
constructor(props)
```

**如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。**

在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 super(props)。否则，this.props 在构造函数中可能会出现未定义的 bug。

通常，在 React 中，构造函数仅用于以下两种情况：
+ 通过给 this.state 赋值对象来初始化内部 state。
+ 为事件处理函数绑定实例

**在 constructor() 函数中不要调用 setState() 方法。**如果你的组件需要使用内部 state，请直接在构造函数中为 this.state 赋值初始 state：
```jsx
constructor(props) {
  super(props);
  // 不要在这里调用 this.setState()
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

只能在构造函数中直接为 this.state 赋值。如需在其他方法中赋值，你应使用 this.setState() 替代。

要避免在构造函数中引入任何副作用或订阅。如遇到此场景，请将对应的操作放置在 componentDidMount 中。

**避免将 props 的值复制给 state！这是一个常见的错误：**

```jsx
constructor(props) {
 super(props);
 // 不要这样做
 this.state = { color: props.color };
}
```
如此做毫无必要（你可以直接使用 this.props.color），同时还产生了 bug（更新 prop 中的 color 时，并不会影响 state）。

只有在你刻意忽略 prop 更新的情况下使用。此时，应将 prop 重命名为 initialColor 或 defaultColor。必要时，你可以修改它的 key，以强制“重置”其内部 state。
