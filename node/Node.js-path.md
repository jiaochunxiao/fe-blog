## Path

### Path.join()

path.join() 方法使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
零长度的 path 片段被忽略。 如果连接的路径字符串是零长度字符串，则将返回 '.'，表示当前工作目录。

```javascript
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// '/foo/bar/baz/asdf'

// 不合法的字符串将抛出异常
 path.join('/foo/bar', {})
Thrown:
TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received type object
...
```

### Path.resolve()

path.resolve() 方法将路径或路径片段的序列解析为绝对路径。

给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径。 例如，给定路径片段的序列：/foo、/bar、baz，调用 path.resolve('/foo', '/bar', 'baz') 将返回 /bar/baz，因为 'baz' 不是绝对路径，而 '/bar' + '/' + 'baz' 是。

如果在处理完所有给定的 path 片段之后，还没有生成绝对路径，则使用当前工作目录。

生成的路径被规范化，并删除尾部斜杠（除非路径解析为根目录）。

零长度的 path 片段被忽略。

如果没有传入 path 片段，则 path.resolve() 将返回当前工作目录的绝对路径。

```javascript
path.resolve('/foo/bar', '/bar')
// '/bar'
```

>resolve把‘／’当成根目录path.resolve()方法可以将多个路径解析为一个规范化的绝对路径。其处理方式类似于对这些路径逐一进行cd操作，与cd操作不同的是，这引起路径可以是文件，并且可不必实际存在（resolve()方法不会利用底层的文件系统判断路径是否存在，而只是进行路径字符串操作）;


区别：

```javascript
> path.resolve('/foo/bar', '/bar')
'/bar'
> path.join('/foo/bar', '/bar')
'/foo/bar/bar'
```