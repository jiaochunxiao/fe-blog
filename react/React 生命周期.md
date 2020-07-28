## React 生命周期

### 挂载

当组件实例被创建并插入DOM中时，其生命周期调用顺序如下：

+ constructor
+ static getDerivedStateFromProps()
+ render()
+ componentDidMount()

*将废弃方法： UNSASE_componentWillMount*



### 更新

当组件的props或state发生变化时触发更新。组件更新的生命周期调用顺序如下：

+ static gerDerivedStateFromProps()
+ shoudComponentUpdate()
+ render()
+ getSnapshotBeforeUpdate()
+ componentDidUpdate()

*降废弃方法：*

+ UNSAFE_componentWillUpdate()
+ UNSAFE_componentWillReceiveProps()



### 卸载

当组件从DOM中移除时会调用如下方法：

+ componentWillUnmount()



### 错误处理

当渲染过程，生命周期、或子组件的构造函数中抛出错误时，胡调用如下方法：

+ static getDerivedStateFromError()
+ componentDidCatch()

