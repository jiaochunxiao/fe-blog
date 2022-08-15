## 关联

Sequelize 支持标准关联关系: 一对一, 一对多 和 多对多.


为此,Sequelize 提供了 四种 关联类型,并将它们组合起来以创建关联：
+ HasOne 关联类型
+ BelongsTo 关联类型
+ HasMany 关联类型
+ BelongsToMany 关联类型

### 定义 Sequelize 关联

四种关联类型的定义非常相似. 假设我们有两个模型 A 和 B. 告诉 Sequelize 两者之间的关联仅需要调用一个函数：

```javascript
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);

A.hasOne(B); // A 有一个 B
A.belongsTo(B); // A 属于 B
A.hasMany(B); // A 有多个 B
A.belongsToMany(B, { through: 'C' }); // A 属于多个 B , 通过联结表 C
```

它们都接受一个对象作为第二个参数(前三个参数是可选的,而对于包含 through 属性的 belongsToMany 是必需的)： They all accept an options object as a second parameter。

```javascript
A.hasOne(B, { /* 参数 */ });
A.belongsTo(B, { /* 参数 */ });
A.hasMany(B, { /* 参数 */ });
A.belongsToMany(B, { through: 'C', /* 参数 */ });
```

关联的定义顺序是有关系的. 换句话说,对于这四种情况,定义顺序很重要. 在上述所有示例中,A 称为 源 模型,而 B 称为 目标 模型. 此术语很重要.

A.hasOne(B) 关联意味着 A 和 B 之间存在一对一的关系,外键在目标模型(B)中定义.

A.belongsTo(B)关联意味着 A 和 B 之间存在一对一的关系,外键在源模型中定义(A).

A.hasMany(B) 关联意味着 A 和 B 之间存在一对多关系,外键在目标模型(B)中定义.

这三个调用将导致 Sequelize 自动将外键添加到适当的模型中(除非它们已经存在).

A.belongsToMany(B, { through: 'C' }) 关联意味着将表 C 用作联结表,在 A 和 B 之间存在多对多关系. 具有外键(例如,aId 和 bId). Sequelize 将自动创建此模型 C(除非已经存在),并在其上定义适当的外键.

*注意：在上面的 belongsToMany 示例中,字符串('C')被传递给 through 参数. 在这种情况下,Sequelize 会自动使用该名称生成模型. 但是,如果已经定义了模型,也可以直接传递模型.*

### 一对一关系

#### 哲理

在深入探讨使用 Sequelize 的各个方面之前,退后一步来考虑一对一关系会发生什么是很有用的.

假设我们有两个模型,Foo 和 Bar.我们要在 Foo 和 Bar 之间建立一对一的关系.我们知道在关系数据库中,这将通过在其中一个表中建立外键来完成.因此,在这种情况下,一个非常关键的问题是：我们希望该外键在哪个表中？换句话说,我们是要 Foo 拥有 barId 列,还是 Bar 应当拥有 fooId 列？

原则上,这两个选择都是在 Foo 和 Bar 之间建立一对一关系的有效方法.但是,当我们说 "Foo 和 Bar 之间存在一对一关系" 时,尚不清楚该关系是 强制性 的还是可选的.换句话说,Foo 是否可以没有 Bar 而存在？ Foo 的 Bar 可以存在吗？这些问题的答案有助于帮我们弄清楚外键列在哪里.

#### 目标

对于本示例的其余部分,我们假设我们有两个模型,即 Foo 和 Bar. 我们想要在它们之间建立一对一的关系,以便 Bar 获得 fooId 列.

#### 实践

实现该目标的主要设置如下：

```javascript
Foo.hasOne(Bar);
Bar.belongsTo(Foo);
```

由于未传递任何参数,因此 Sequelize 将从模型名称中推断出要做什么. 在这种情况下,Sequelize 知道必须将 fooId 列添加到 Bar 中.

这样,在上述代码之后调用 Bar.sync() 将产生以下 SQL(例如,在PostgreSQL上)：

```sql
CREATE TABLE IF NOT EXISTS "foos" (
  /* ... */
);
CREATE TABLE IF NOT EXISTS "bars" (
  /* ... */
  "fooId" INTEGER REFERENCES "foos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
  /* ... */
);
```

#### 参数

可以将各种参数作为关联调用的第二个参数传递.

##### onDelete 和 onUpdate

例如,要配置 ON DELETE 和 ON UPDATE 行为,你可以执行以下操作：

```javascript
Foo.hasOne(Bar, {
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});
Bar.belongsTo(Foo);
```
可用的参数为 RESTRICT, CASCADE, NO ACTION, SET DEFAULT 和 SET NULL.

一对一关联的默认值, ON DELETE 为 SET NULL 而 ON UPDATE 为 CASCADE.

##### 自定义外键

上面显示的 hasOne 和 belongsTo 调用都会推断出要创建的外键应称为 fooId. 如要使用其他名称,例如 myFooId：

```javascript
// 方法1
Foo.hasOne(Bar, {
  foreignKey: 'myFooId'
});
Bar.belongsTo(Foo);

// 方法2
Foo.hasOne(Bar, {
  foreignKey: {
    name: 'myFooId',
  },
});
Bar.belongsTo(Foo);

// 方法3
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
  foreignKey: 'myFooId',
});

// 方法4
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
  foreignKey: {
    name: 'myFooId',
  },
});
```

如上所示,foreignKey 参数接受一个字符串或一个对象. 当接收到一个对象时,该对象将用作列的定义,就像在标准的 sequelize.define 调用中所做的一样. 因此,指定诸如 type, allowNull, defaultValue 等参数就可以了.

例如,要使用 UUID 作为外键数据类型而不是默认值(INTEGER),只需执行以下操作：

```javascript
const { DataTypes } = require("Sequelize");

Foo.hasOne(Bar, {
  foreignKey: {
    // name: 'myFooId'
    type: DataTypes.UUID
  }
});
Bar.belongsTo(Foo);
```
#### 强制性与可选性关联

默认情况下,该关联被视为可选. 换句话说,在我们的示例中,fooId 允许为空,这意味着一个 Bar 可以不存在 Foo 而存在. 只需在外键选项中指定 allowNull: false 即可更改此设置：

```javascript
Foo.hasOne(Bar, {
  foreignKey: {
    allowNull: false
  }
});
// "fooId" INTEGER NOT NULL REFERENCES "foos" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
```

### 一对多关系

#### 原理

一对多关联将一个源与多个目标连接,而所有这些目标仅与此单个源连接.

这意味着,与我们必须选择放置外键的一对一关联不同,在一对多关联中只有一个选项. 例如,如果一个 Foo 有很多 Bar(因此每个 Bar 都属于一个 Foo),那么唯一明智的方式就是在 Bar 表中有一个 fooId 列. 而反过来是不可能的,因为一个 Foo 会有很多 Bar.

#### 目标

在这个例子中,我们有模型 Team 和 Player. 我们要告诉 Sequelize,他们之间存在一对多的关系,这意味着一个 Team 有 Player ,而每个 Player 都属于一个 Team.

#### 实践

```javascript
Team.hasMany(Player);
Player.belongsTo(Team);
```

同样,实现此目标的主要方法是使用一对 Sequelize 关联(hasMany 和 belongsTo).

例如,在 PostgreSQL 中,以上设置将在 sync() 之后产生以下 SQL：

```sql
CREATE TABLE IF NOT EXISTS "Teams" (
  /* ... */
);
CREATE TABLE IF NOT EXISTS "Players" (
  /* ... */
  "TeamId" INTEGER REFERENCES "Teams" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  /* ... */
);
```
