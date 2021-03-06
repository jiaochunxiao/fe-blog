## Node.js入门教程-package-lock.json

[Node.js入门教程](http://nodejs.cn/learn)

package-lock.json 旨在跟踪被安装的每个package的确切版本，以便产品可以以相同的方式被100%复制。说白了，就是提供了相同的环境运行，保证项目能正常启动并运行。

这解决了 package.json 一直尚未解决的特殊问题。 在 package.json 中，可以使用 semver 表示法设置要升级到的版本（补丁版本或次版本），例如：

+ 如果写入的是 〜0.13.0，则只更新补丁版本：即 0.13.1 可以，但 0.14.0 不可以。
+ 如果写入的是 ^0.13.0，则要更新补丁版本和次版本：即 0.13.1、0.14.0、依此类推。
+ 如果写入的是 0.13.0，则始终使用确切的版本。

如果未包含package-lock.json文件，当其他人运行安装依赖包 npm install 时.如果指定了 ~ 语法且 package 发布了新的补丁版本，则新的补丁版本可能会被安装。因此，原始项目与当前的项目实际上是不同的。即使补丁版本或次版本没有引入重大更改，但还是可能引入缺陷。

package-lock.json通过固化当前项目的 package 版本，确保了引入的依赖包的确切版本。


**参考**

1. [node.js入门教程](http://nodejs.cn/learn)
