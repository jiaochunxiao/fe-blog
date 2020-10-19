## eslint

ESLint最初是由Nicholas C. Zakas 于2013年6月创建的开源项目。它的目标是提供一个插件化的javascript代码检测工具。

> Find and fix problems in your JavaScript code

> ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。

+ 代码质量问题：使用方式有可能有问题(problematic patterns)
+ 代码风格问题：风格不符合一定规则 (doesn’t adhere to certain style guidelines)

### configuring Eslint

ESlint 被设计成完全可配置的，你可以关闭每一个规则，只运行基本语法验证。
有两种主要的方式来配置ESLint:

+ Configuration Comments: 使用Javasctipt注释配置信息直接嵌入到一个代码源文件；
+ Configuration Files: 使用 Javascript、JSON或者YAML文件为整个目录和它的子目录指定配置信息。 可以配置一个独立的.eslintrc.* 文件，或者直接在 package.json文件里的eslintConfig字段指定配置，ESlint 会查找和自动读取它们。也可以在命令行运行时指定一个任意的配置文件。

