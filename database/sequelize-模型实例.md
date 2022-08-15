## 模型实例

如你所知,模型是 ES6 类. 类的实例表示该模型中的一个对象(该对象映射到数据库中表的一行). 这样,模型实例就是 DAOs

```javascript
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("user", {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: 'green'
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER
});

(async () => {
  await sequelize.sync({ force: true });
  // 这里是代码
})();
```

### 创建实例

尽管模型是一个类,但是你不应直接使用 new 运算符来创建实例. 相反,应该使用 build 方法：

```javascript
const jane = User.build({ name: "Jane" });
console.log(jane instanceof User); // true
console.log(jane.name); // "Jane"
```

但是,以上代码根本无法与数据库通信(请注意,它甚至不是异步的)！ 这是因为 **build 方法仅创建一个对象,该对象 表示 可以 映射到数据库的数据. 为了将这个实例真正保存(即持久保存)在数据库中,应使用 save 方法**：

```javascript
await jane.save();
console.log('Jane 已保存到数据库!');
```

请注意,从上面代码段中的 await 用法来看,save 是一种异步方法. 实际上,几乎每个 Sequelize 方法都是异步的. build 是极少数例外之一.


#### 非常有用的捷径: create 方法

Sequelize提供了 **create 方法,该方法将上述的 build 方法和 save 方法合并为一个方法**：

```javascript
const jane = await User.create({ name: "Jane" });
// Jane 现在存在于数据库中！
console.log(jane instanceof User); // true
console.log(jane.name); // "Jane"
```

### 注意: 实例记录

尝试将模型实例直接记录到 console.log 会产生很多问题,因为 Sequelize 实例具有很多附加条件. 相反,你可以使用 .toJSON() 方法(顺便说一句,它会自动保证实例被 JSON.stringify 编辑好).

```javascript
const jane = await User.create({ name: "Jane" });
// console.log(jane); // 不要这样!
console.log(jane.toJSON()); // 这样最好!
console.log(JSON.stringify(jane, null, 4)); // 这样也不错!
```

### 默认值

内置实例将自动获得默认值：

```javascript
const jane = User.build({ name: "Jane" });
console.log(jane.favoriteColor); // "green"
```

### 更新实例

如果你更改实例的某个字段的值,则再次调用 save 将相应地对其进行更新：

```javascript
const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
jane.name = "Ada";
// 数据库中的名称仍然是 "Jane"
await jane.save();
// 现在该名称已在数据库中更新为 "Ada"！
```

您可以使用 set 方法一次更新多个字段:

```javascript
const jane = await User.create({ name: "Jane" });

jane.set({
  name: "Ada",
  favoriteColor: "blue"
});
// 如上, 数据库中还是 "Jane" 和 "green"
await jane.save();
// 数据库现在将 "Ada" 和 "blue" 作为 name 和 favoriteColor
```

请注意, 此处的 save() 也将保留在此实例上所做的任何其他更改, 而不仅仅是之前的 set 调用中的更改.如果要更新一组特定的字段, 可以使用update:

```javascript
const jane = await User.create({ name: "Jane" });
jane.favoriteColor = "blue"
await jane.update({ name: "Ada" })
// 数据库现在将 "Ada" 作为 name，但仍然有默认的 "green" 作为 favoriteColor
await jane.save()
// 数据库现在将 "Ada" 作为 name，但仍然有默认的 "blue" 作为 favoriteColor
```

### 删除实例

你可以通过调用 destroy 来删除实例:

```javascript
const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
await jane.destroy();
// 现在该条目已从数据库中删除
```

### 重载实例

可以通过调用 reload 从数据库中重新加载实例:

```javascript
const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
jane.name = "Ada";
// 数据库中的名称依然是 "Jane"
await jane.reload();
console.log(jane.name); // "Jane"
```
reload 调用生成一个 SELECT 查询,以从数据库中获取最新数据.

### 仅保存部分字段

通过传递一个列名数组,可以定义在调用 save 时应该保存哪些属性.

当你基于先前定义的对象设置属性时,例如,当你通过 Web 应用程序的形式获取对象的值时,这很有用. 此外,这在 update 实现中内部使用. 它是这样的：

```javascript
const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
console.log(jane.favoriteColor); // "green"
jane.name = "Jane II";
jane.favoriteColor = "blue";
await jane.save({ fields: ['name'] });
console.log(jane.name); // "Jane II"
console.log(jane.favoriteColor); // "blue"
// 上面显示为 "blue",因为本地对象将其设置为 "blue",
// 但是在数据库中它仍然是 "green"：
await jane.reload();
console.log(jane.name); // "Jane II"
console.log(jane.favoriteColor); // "green"
```

### save的 变化的认识

save方法在内部进行了优化，只更新真正更改的字段。这意味着如果你不改变任何东西并调用save, Sequelize将知道保存是多余的，并且什么也不做，也就是说，不会生成查询(它仍然会返回一个Promise，但它会立即解决)。此外，如果在调用save时只更改了少数属性，则只有这些字段将在UPDATE查询中发送，以提高性能。

### 递增和递减整数值

为了递增/递减实例的值而不会遇到并发问题,Sequelize提供了 increment 和 decrement 实例方法.

```javascript
const jane = await User.create({ name: "Jane", age: 100 });
const incrementResult = await jane.increment('age', { by: 2 });
// 注意: 如只增加 1, 你可以省略 'by' 参数, 只需执行 `user.increment('age')`

// 在 PostgreSQL 中, 除非设置了 `{returning：false}` 参数(不然它将是 undefined),
// 否则 `incrementResult` 将是更新后的 user.

// 在其它数据库方言中, `incrementResult` 将会是 undefined. 如果你需要更新的实例, 你需要调用 `user.reload()`.
```

也可以一次递增多个字段:

```javascript
const jane = await User.create({ name: "Jane", age: 100, cash: 5000 });
await jane.increment({
  'age': 2,
  'cash': 100
});

// 如果值增加相同的数量,则也可以使用以下其他语法：
await jane.increment(['age', 'cash'], { by: 2 });
```

递减的工作原理完全相同.
