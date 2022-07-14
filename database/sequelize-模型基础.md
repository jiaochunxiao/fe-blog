## 模型基础

模型是 Sequelize 的本质. 模型是代表数据库中表的抽象. 在 Sequelize 中,它是一个 Model 的扩展类.

Sequelize 中的模型有一个名称. 此名称不必与它在数据库中表示的表的名称相同. 通常,模型具有单数名称(例如,User),而表具有复数名称(例如, Users),当然这是完全可配置的.

### 模型定义

在 Sequelize 中可以用两种等效的方式定义模型：

+ 调用 sequelize.define(modelName, attributes, options)
+ 扩展 Model 并调用 init(attributes, options)

定义模型后,可通过其模型名称在 sequelize.models 中使用该模型。


#### 使用 sequlize.define

```js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
});

// `sequelize.define` 会返回模型
console.log(User === sequelize.models.User); // true
```

#### 扩展Model

```js
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}

User.init({
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'User' // 我们需要选择模型名称
});

// 定义的模型是类本身
console.log(User === sequelize.models.User); // true
```

在内部,sequelize.define 调用 Model.init,因此两种方法本质上是等效的.

#### 公共字段的注意事项

*添加与模型属性之一同名的公共类字段会出现问题*。 Sequelize 为通过 Model.init 定义的每个属性添加一个 getter 和一个 setter. 添加公共类字段将隐藏那些 getter 和 setter，从而阻止对模型的实际数据的访问.

```js
// 无效的
class User extends Model {
  id; // 此字段将影响 sequelize 的 getter 和 setter. 它应该被删除.
  otherPublicField; // 这个字段不会影响任何东西. 没问题.
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, { sequelize });

const user = new User({ id: 1 });
user.id; // undefined
```

```js
// 有效的
class User extends Model {
  otherPublicField;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, { sequelize });

const user = new User({ id: 1 });
user.id; // 1
```

在 TypeScript 中, 您可以使用 declare 关键字添加键入信息, 而无需添加实际的公共类字段:
```js
// 有效
class User extends Model {
  declare id: number; // 您可以使用 `declare` 关键字添加键入信息, 而无需添加实际的公共类字段.
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, { sequelize });

const user = new User({ id: 1 });
user.id; // 1
```

### 表名推断

请注意,在以上两种方法中,都从未明确定义表名(Users). 但是,给出了模型名称(User).

默认情况下,**当未提供表名时,Sequelize 会自动将模型名复数并将其用作表名**. 这种复数是通过称为 inflection 的库在后台完成的,因此可以正确计算不规则的复数(例如 person -> people).

当然,此行为很容易配置。

#### 强制表名称等于模型名称

你可以使用 freezeTableName: true 参数停止 Sequelize 执行自动复数化. 这样,Sequelize 将推断表名称等于模型名称,而无需进行任何修改：

```js
sequelize.define('User', {
  // ... (属性)
}, {
  freezeTableName: true
});
```

上面的示例将创建一个名为 User 的模型,该模型指向一个也名为 User 的表.

也可以为 sequelize 实例全局定义此行为：
```js
const sequelize = new Sequelize('sqlite::memory:', {
  define: {
    freezeTableName: true
  }
});
```
这样,所有表将使用与模型名称相同的名称。

#### 直接提供表名

你也可以直接直接告诉 Sequelize 表名称：
```js
sequelize.define('User', {
  // ... (属性)
}, {
  tableName: 'Employees'
});
```

个人比较喜欢直接提供表名这种。

### 模型同步

定义模型时,你要告诉 Sequelize 有关数据库中表的一些信息. 但是,如果该表实际上不存在于数据库中怎么办？ 如果存在,但具有不同的列,较少的列或任何其他差异,该怎么办？

这就是模型同步的来源.可以通过调用一个异步函数(返回一个Promise)model.sync(options). 通过此调用,Sequelize 将自动对数据库执行 SQL 查询. 请注意,这仅更改数据库中的表,而不更改 JavaScript 端的模型。

+ User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
+ User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除，**慎用**
+ User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

```js
await User.sync({ force: true });
console.log("用户模型表刚刚(重新)创建！");
```

#### 一次同步所有模型
你可以使用 sequelize.sync() 自动同步所有模型. 示例：

```js
await sequelize.sync({ force: true });
console.log("所有模型均已成功同步.");
```

#### 删除表

删除与模型相关的表：

```js
await User.drop();
console.log("用户表已删除!");
```

删除所有表：
```js
await sequelize.drop();
console.log("所有表已删除!");
```



