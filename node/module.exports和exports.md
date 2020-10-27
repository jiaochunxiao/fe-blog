## module.exports和exports的区别

> require方能看到的只有 module.exports 这个对象，它是看不到 exports 对象的，而我们在编写模块时用到的 exports 对象，实际上只是对 module.exports 的引用。

以上引用自[Node.js模块里exports与module.exports的区别?](https://www.zhihu.com/question/26621212/answer/625539463) 问题下 [小明plus](https://www.zhihu.com/people/xiaomingplus)的回答。

```javascript
function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // Module code here. In this example, define a function.
    function someFunc() {}
    exports = someFunc;
    // At this point, exports is no longer a shortcut to module.exports, and
    // this module will still export an empty default object.
    module.exports = someFunc;
    // At this point, the module will now export someFunc, instead of the
    // default object.
  })(module, module.exports);
  return module.exports;
}
```