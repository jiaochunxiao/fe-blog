## redux



### react-reudx

+ \<Provider store>

<Provider store> 使组件层级中的 connect() 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 \<Provider> 中才能使用 connect() 方法。

如果你真的不想把根组件嵌套在 \<Provider>中，你可以把 store 作为 props 传递到每一个被 connect() 包装的组件，但是我们只推荐您在单元测试中对 store 进行伪造 (stub) 或者在非完全基于 React 的代码中才这样做。正常情况下，你应该使用 \<Provider>。

+ connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

连接 React 组件与 Redux store。

连接操作不会改变原来的组件类。

反而返回一个新的已与 Redux store 连接的组件类。

+

### redux-thunk