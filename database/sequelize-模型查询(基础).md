## 模型查询（基础）

### 简单 INSERT 查询

```js
// 创建一个新用户
const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
console.log("Jane's auto-generated ID:", jane.id);
```

Model.create() 方法是**使用 Model.build() 构建未保存实例并使用 instance.save() 保存实例**的简写形式.


也可以定义在 create 方法中的属性. 如果你基于用户填写的表单创建数据库条目,这将特别有用. 例如,使用它可以允许你将 User 模型限制为仅设置用户名和地址,而不设置管理员标志 (例如, isAdmin)：

```js
const user = await User.create({
  username: 'alice123',
  isAdmin: true
}, { fields: ['username'] });
// 假设 isAdmin 的默认值为 false
console.log(user.username); // 'alice123'
console.log(user.isAdmin); // false
```

### 简单 SELECT 查询

你可以使用 findAll 方法从数据库中读取整个表：

```js
// 查询所有用户
const users = await User.findAll();
console.log(users.every(user => user instanceof User)); // true
console.log("All users:", JSON.stringify(users, null, 2));
```

```SQL
SELECT * FROM ...
```

### SELECT 查询特定属性

选择某些特定属性,可以使用 attributes 参数：

```js
Model.findAll({
  attributes: ['foo', 'bar']
});
```
```SQL
SELECT foo, bar FROM ...
```

可以使用**嵌套数组来重命名属性**：

```js
Model.findAll({
  attributes: ['foo', ['bar', 'baz'], 'qux']
});
```
等价于：
```SQL
SELECT foo, bar AS baz, qux FROM ...
```

可以使用**sequelize.fn进行聚合**：

```js
Model.findAll({
  attributes: [
    'foo',
    [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'],
    'bar'
  ]
});
```
等价于：
```SQL
SELECT  foo, COUNT(hats) AS n_hats, bar FROM ...
```

使用聚合函数时,必须为它提供一个别名,以便能够从模型中访问它. 在上面的示例中,你可以通过 instance.n_hats 获取帽子数量.

有时，如果只想添加聚合，那么列出模型的所有属性可能会麻烦：

```js
Model.findAll({
  attributes: [
    'id', 'foo', 'bar', 'baz', 'qux', 'hats', // 列出模型的所有属性
    [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'], // 添加聚合函数
  ]
});

// 这个更短，并且不易出错， 如果以后在模型中添加/删除属性，它仍然可以工作
Model.findAll({
  attributes: {
    include: [
      [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'], // 添加聚合函数
    ]
  }
})
```
```SQL
SELECT id, foo, bar, baz, qux, hats, COUNT(hats) AS n_hats FROM ...
```

同样，可以排除某些属性：

```js
Model.findAll({
  attributes: {
    exclude: ['foo', 'bar']
  }
})
```
### 应用 WHERE 子句

where 参数用于过滤查询.where 子句有很多运算符,可以从 Op 中以 Symbols 的形式使用.

#### 基础

```js
Post.findAll({
  where: {
    authorId: 1,
  }
})
// SELECT * FORM post WHERE authorId = 1
```

可以看到没有显式传递任何运算符(来自Op),因为默认情况下 Sequelize 假定进行相等比较. 上面的代码等效于：

```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    authorId: {
      [Op.eq]: 2
    }
  }
});
// SELECT * FROM post WHERE authorId = 2;
```
