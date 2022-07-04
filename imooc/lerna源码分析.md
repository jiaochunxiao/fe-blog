## lerna源码分析

```js
require('.')
// 等价于
require('./index.js')
```
本地依赖最佳实践

*注意不要忘记 npm install*

```json
{
    "dependencies": {
        "@lerna/global-options": "file:../global-options",
    }
}
```

### yargs


