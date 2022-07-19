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

可以看到没有显式传递任何**运算符(来自Op)**,因为默认情况下 Sequelize 假定进行相等比较. 上面的代码等效于：

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

可传递多个校验：
```js
Post.findAll({
  where: {
    authorId: 12,
    status: 'active',
  },
});

// SELECT * FROM post WHERE authorId = 12 AND status = 'active';
```

OR 可以通过类似的方式轻松执行：

```javascript
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.or]: [
      { authorId: 12 },
      { authorId: 13 },
    ]
  }
});
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;
```
由于以上的 OR 涉及相同字段 ,因此 Sequelize 允许你使用稍有不同的结构,该结构更易读并且作用相同：
```javascript
const { Op } = require("sequelize");
Post.destroy({
  where: {
    authorId: {
      [Op.or]: [12, 13],
    }
  },
});

// DELETE FROM post WHERE authorId = 12 OR authorId = 13;
```
#### 操作符
Sequelize 提供了多种运算符.

```javascript
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // 基本
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // 使用方言特定的列标识符 (以下示例中使用 PG):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // 数字比较
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // 其它操作符

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (不区分大小写) (仅 PG)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (仅 PG)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (仅 PG)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (仅 PG)

      [Op.any]: [2, 3],                        // ANY ARRAY[2, 3]::INTEGER (仅 PG)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // 匹配文本搜索字符串 'fat' 和 'rat' (仅 PG)

      // 在 Postgres 中, Op.like/Op.iLike/Op.notLike 可以结合 Op.any 使用:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY ARRAY['cat', 'hat']

      // 还有更多的仅限 postgres 的范围运算符,请参见下文
    }
  }
});
```

Op.in 的简写语法：

```javascript
Post.findAll({
  where: {
    id: [1, 2, 3] // 等同于使用 `id: { [Op.in]: [1, 2, 3] }`
  },
});
// SELECT ... FROM 'posts' AS 'post' WHERE 'post'.'id' IN (1, 2, 3);
```

#### 运算符的逻辑组合

运算符 Op.and, Op.or 和 Op.not 可用于创建任意复杂的嵌套逻辑比较。

使用 Op.and 和 Op.or 示例：

```javascript
const { Op } = require("sequelize");
Foo.findAll({
  where: {
    rank: {
      [Op.or]: {
        [Op.lt]: 1000,
        [Op.eq]: null
      },
    },
    // rank < 1000 or rank is Null
    {
      createdAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
    // createdAt < [timestamp] AND createdAt > [timestamp] - 24 * 60 * 60 * 1000
    {
      [Op.or]: [
        {
          title: {
            [Op.like]: 'Boat%',
          }
        },
        {
          description: {
            [Op.like]: '%boat%',
          }
        }
      ]
    }
    // title LIKE 'Boat%' OR description LIKE '%boat%'
  },
});
```

使用 Op.not示例

```javascript
Project.findAll({
  where: {
    name: 'Some Project',
    [Op.not]: [
      { id: [1,2,3] },
      {
        description: {
          [Op.like]: 'Hello%'
        }
      }
    ]
  }
});
```
上面将生成

```sql
SELECT *
FROM `Projects`
WHERE (
  `Projects`.`name` = 'Some Project'
  AND NOT (
    `Projects`.`id` IN (1,2,3)
    AND
    `Projects`.`description` LIKE 'Hello%'
  )
)
```

#### 高级查询

如果你想得到类似 WHERE char_length("content") = 7 的结果怎么办？

```javascript
Post.findAll({
  where: sequelize.where(sequelize.fn('char_length', sequelize.col('content')), 7)
});
// SELECT ... FROM "posts" AS "post" WHERE char_length("content") = 7
```

请注意方法 sequelize.fn 和 sequelize.col 的用法,应分别用于**指定 SQL 函数调用和列**.应该使用这些方法,而不是传递纯字符串(例如 char_length(content)),因为 Sequelize 需要以不同的方式对待这种情况(例如,使用其他符号转义方法).

```javascript
Post.findAll({
  where: {
    [Op.or]: [
      sequelize.where(sequelize.fn('char_length', sequelize.col('content')), 7),
      {
        content: {
          [Op.like]: 'Hello%'
        }
      },
      {
        [Op.and]: [
          { status: 'draft' },
          sequelize.where(sequelize.fn('char_length', sequelize.col('content')), {
            [Op.gt]: 10
          })
        ]
      }
    ]
  }
});
```

上面生成一下SQL:

```sql
SELECT
  ...
FROM "posts" AS "post"
WHERE (
  char_length("content") = 7
  OR
  "post"."content" LIKE 'Hello%'
  OR (
    "post"."status" = 'draft'
    AND
    char_length("content") > 10
  )
)
```

### 简单 UPDATE 查询

Update 查询也接受 where 参数 就像上面读取查询一样

```javascript
// 将所有没有姓氏的人更改为 "Doe"
await User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
});
```

### 简单 DELETE 查询

Delete 查询也接受 where 参数,就像上面的读取查询一样.

```javascript
// 删除所有名为 "Jane" 的人
await User.destroy({
  where: {
    firstName: "Jane"
  }
});
```

要销毁所有内容,可以使用 TRUNCATE SQL：

```sql
// 截断表格
await User.destroy({
  truncate: true
});
```

### 批量创建

Sequelize 提供了 Model.bulkCreate 方法,以允许仅一次查询即可一次创建多个记录.

通过接收数组对象而不是单个对象,Model.bulkCreate 的用法与 Model.create 非常相似.

```javascript
const captains = await Captain.bulkCreate([
  { name: 'Jack Sparrow' },
  { name: 'Davy Jones' }
]);
console.log(captains.length); // 2
console.log(captains[0] instanceof Captain); // true
console.log(captains[0].name); // 'Jack Sparrow'
console.log(captains[0].id); // 1 // (或另一个自动生成的值)
```

但是,**默认情况下,bulkCreate 不会在要创建的每个对象上运行验证(而 create 可以做到). 为了使 bulkCreate 也运行这些验证,必须通过validate: true 参数. 但这会降低性能**. 用法示例：

```javaScript
const Foo = sequelize.define('foo', {
  bar: {
    type: DataTypes.TEXT,
    validate: {
      len: [4, 6]
    }
  }
});

// 这不会引发错误,两个实例都将被创建
await Foo.bulkCreate([
  { name: 'abc123' },
  { name: 'name too long' }
]);

// 这将引发错误,不会创建任何内容
await Foo.bulkCreate([
  { name: 'abc123' },
  { name: 'name too long' }
], { validate: true });
```

如果你直接从用户获取值,那么限制实际插入的列可能会有所帮助. 为了做到这一点,bulkCreate() 接受一个 fields 参数,该参数须为你要定义字段的数组(其余字段将被忽略).

```javascript
await User.bulkCreate([
  { username: 'foo' },
  { username: 'bar', admin: true }
], { fields: ['username'] });
// foo 和 bar 都不会是管理员.
```

### 排序和分组

Sequelize 提供了 order and group 参数,来与 ORDER BY 和 GROUP BY 一起使用.

#### 排序

order 参数采用一系列 *项* 来让 sequelize 方法对查询进行排序. 这些 *项* 本身是 [column, direction] 形式的数组. 该列将被正确转义,并且将在有效方向列表中进行验证(例如 ASC, DESC, NULLS FIRST 等).

```javascript
Subtask.findAll({
  order: [
    // 将转义 title 并针对有效方向列表进行降序排列
    ['title', 'DESC'],

    // 将按最大年龄进行升序排序
    sequelize.fn('max', sequelize.col('age')),

    // 将按最大年龄进行降序排序
    [sequelize.fn('max', sequelize.col('age')), 'DESC'],

    // 将按 otherfunction(`col1`, 12, 'lalala') 进行降序排序
    [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],

    // 将使用模型名称作为关联名称按关联模型的 createdAt 排序.
    [Task, 'createdAt', 'DESC'],

    // 将使用模型名称作为关联名称通过关联模型的 createdAt 排序.
    [Task, Project, 'createdAt', 'DESC'],

    // 将使用关联名称按关联模型的 createdAt 排序.
    ['Task', 'createdAt', 'DESC'],

    // 将使用关联的名称按嵌套的关联模型的 createdAt 排序.
    ['Task', 'Project', 'createdAt', 'DESC'],

    // 将使用关联对象按关联模型的 createdAt 排序. (首选方法)
    [Subtask.associations.Task, 'createdAt', 'DESC'],

    // 将使用关联对象按嵌套关联模型的 createdAt 排序. (首选方法)
    [Subtask.associations.Task, Task.associations.Project, 'createdAt', 'DESC'],

    // 将使用简单的关联对象按关联模型的 createdAt 排序.
    [{model: Task, as: 'Task'}, 'createdAt', 'DESC'],

    // 将由嵌套关联模型的 createdAt 简单关联对象排序.
    [{model: Task, as: 'Task'}, {model: Project, as: 'Project'}, 'createdAt', 'DESC']
  ],

  // 将按最大年龄降序排列
  order: sequelize.literal('max(age) DESC'),

  // 如果忽略方向,则默认升序,将按最大年龄升序排序
  order: sequelize.fn('max', sequelize.col('age')),

  // 如果省略方向,则默认升序, 将按年龄升序排列
  order: sequelize.col('age'),

  // 将根据方言随机排序(但不是 fn('RAND') 或 fn('RANDOM'))
  order: sequelize.random()
});

Foo.findOne({
  order: [
    // 将返回 `name`
    ['name'],
    // 将返回 `username` DESC
    ['username', 'DESC'],
    // 将返回 max(`age`)
    sequelize.fn('max', sequelize.col('age')),
    // 将返回 max(`age`) DESC
    [sequelize.fn('max', sequelize.col('age')), 'DESC'],
    // 将返回 otherfunction(`col1`, 12, 'lalala') DESC
    [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],
    // 将返回 otherfunction(awesomefunction(`col`)) DESC, 这种嵌套可能是无限的!
    [sequelize.fn('otherfunction', sequelize.fn('awesomefunction', sequelize.col('col'))), 'DESC']
  ]
});
```

回顾一下,order 数组的元素可以如下：

+ 一个字符串 (它将被自动引用)
+ 一个数组, 其第一个元素将被引用,第二个将被逐字追加
+ 一个具有 raw 字段的对象:
  + raw 内容将不加引用地逐字添加
  + 其他所有内容都将被忽略,如果未设置 raw,查询将失败
+ 调用 Sequelize.fn (这将在 SQL 中生成一个函数调用)
+ 调用 Sequelize.col (这将引用列名)

#### 分组

分组和排序的语法相同,只是分组不接受方向作为数组的最后一个参数(不存在 ASC, DESC, NULLS FIRST 等).

你还可以将字符串直接传递给 group,该字符串将直接(普通)包含在生成的 SQL 中. 请谨慎使用,请勿与用户生成的内容一起使用.

```javascript
Project.findAll({ group: 'name' });
// 生成 'GROUP BY name'
```

### 限制和分页

使用 limit 和 offset 参数可以进行 限制/分页：

```javascript
// 提取10个实例/行
Project.findAll({ limit: 10 });

// 跳过8个实例/行
Project.findAll({ offset: 8 });

// 跳过5个实例,然后获取5个实例
Project.findAll({ offset: 5, limit: 5 });
```

通常这些与 order 参数一起使用.

### 实用方法

#### count

count 方法仅计算数据库中元素出现的次数.

```javascript
console.log(`这有 ${await Project.count()} 个项目`);

const amount = await Project.count({
  where: {
    id: {
      [Op.gt]: 25
    }
  }
});
console.log(`这有 ${amount} 个项目 id 大于 25`);
```

#### max, min 和 sum

假设我们有三个用户,分别是10、5和40岁.

```javascript
await User.max('age'); // 40
await User.max('age', { where: { age: { [Op.lt]: 20 } } }); // 10
await User.min('age'); // 5
await User.min('age', { where: { age: { [Op.gt]: 5 } } }); // 10
await User.sum('age'); // 55
await User.sum('age', { where: { age: { [Op.gt]: 5 } } }); // 50
```

#### increment, decrement

假设我们有一个用户, 他的年龄是 10 岁

```javascript
await User.increment({age: 5}, { where: { id: 1 } }) // 将年龄增加到15岁
await User.increment({age: -5}, { where: { id: 1 } }) // 将年龄降至5岁
```

