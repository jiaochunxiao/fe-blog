## Source Map

js 经过压缩混淆后，代码通常只有一行。但是实际运行中，如果有报错，该如何查找错误的位置呢？这就是Source Map想要解决的问题。

sourcemap 是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。

sourcemap 文件就是记录了从源代码文件到压缩文件的一个代码对应关系记录表，通过压缩文件和 sourcemap 文件可以原原本本找出源代码文件。

### Source Map 的格式

```json
{
    version : 3,
    file: "out.js",
    sourceRoot : "",
    sources: ["foo.js", "bar.js"],
    names: ["src", "maps", "are", "fun"],
    mappings: "AAgBC,SAAQ,CAAEA"
}
```

属性解释：

+ version：Source map的版本，目前为3。
+ file：转换后的文件名。
+ sourceRoot：转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空。
+ sources：转换前的文件。该项是一个数组，表示可能存在多个文件合并。
+ names：转换前的所有变量名和属性名。
+ mappings：记录位置信息的字符串。