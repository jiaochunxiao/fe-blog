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


