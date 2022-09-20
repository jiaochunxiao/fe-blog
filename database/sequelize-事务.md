## 事务

事务主要用于处理操作量大，复杂度高的数据。比如说，在人员管理系统中，你删除一个人员，你既需要删除人员的基本资料，也要删除和该人员相关的信息，如信箱，文章等等，这样，这些数据库操作语句就构成一个事务！

一般来说，事务是必须满足4个条件（ACID）：：原子性（Atomicity，或称不可分割性）、一致性（Consistency）、隔离性（Isolation，又称独立性）、持久性（Durability）。

+ 原子性：一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。

+ 一致性：在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。

+ 隔离性：数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。

+ 持久性：事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。


默认情况下,Sequelize 不使用事务. 但是,对于 Sequelize 的生产环境使用,你绝对应该将 Sequelize 配置为使用事务.

Sequelize 支持两种使用事务的方式：

+ 非托管事务: 提交和回滚事务应由用户手动完成(通过调用适当的 Sequelize 方法).

+ 托管事务: 如果引发任何错误,Sequelize 将自动回滚事务,否则将提交事务. 另外,如果启用了CLS(连续本地存储),则事务回调中的所有查询将自动接收事务对象.

### 非托管事务

```javascript
// 首先,我们开始一个事务并将其保存到变量中
const t = await sequelize.transaction();

try {

  // 然后,我们进行一些调用以将此事务作为参数传递:

  const user = await User.create({
    firstName: 'Bart',
    lastName: 'Simpson'
  }, { transaction: t });

  await user.addSibling({
    firstName: 'Lisa',
    lastName: 'Simpson'
  }, { transaction: t });

  // 如果执行到此行,且没有引发任何错误.
  // 我们提交事务.
  await t.commit();

} catch (error) {

  // 如果执行到达此行,则抛出错误.
  // 我们回滚事务.
  await t.rollback();

}
```

如上所示,非托管事务 方法要求你在必要时手动提交和回滚事务.

### 托管事务

托管事务会自动处理提交或回滚事务. 通过将回调传递给 sequelize.transaction 来启动托管事务. 这个回调可以是 async(通常是)的.

在这种情况下,将发生以下情况：

+ Sequelize 将自动开始事务并获得事务对象 t
+ 然后,Sequelize 将执行你提供的回调,并在其中传递 t
+ 如果你的回调抛出错误,Sequelize 将自动回滚事务
+ 如果你的回调成功,Sequelize 将自动提交事务
+ 只有这样,sequelize.transaction 调用才会解决：
  + 解决你的回调的决议
  + 或者,如果你的回调引发错误,则拒绝并抛出错误

示例代码

```javascript
try {

  const result = await sequelize.transaction(async (t) => {

    const user = await User.create({
      firstName: 'Abraham',
      lastName: 'Lincoln'
    }, { transaction: t });

    await user.setShooter({
      firstName: 'John',
      lastName: 'Boothe'
    }, { transaction: t });

    return user;

  });

  // 如果执行到此行,则表示事务已成功提交,`result`是事务返回的结果
  // `result` 就是从事务回调中返回的结果(在这种情况下为 `user`)

} catch (error) {

  // 如果执行到此,则发生错误.
  // 该事务已由 Sequelize 自动回滚！

}
```

注意,t.commit() 和 t.rollback() 没有被直接调用.

#### 抛出错误以回滚

使用托管事务时,你 不应 手动提交或回滚事务. 如果所有查询都成功(就不引发任何错误而言),但是你仍然想回滚事务,那么你应该自己引发一个错误：

```javascript
await sequelize.transaction(async t => {
  const user = await User.create({
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }, { transaction: t });

  // 查询成功,但我们仍要回滚！
  // 我们手动引发错误,以便 Sequelize 自动处理所有内容.
  throw new Error();
});
```

#### 自动将事务传递给所有查询

在上面的示例中,仍然通过传递 { transaction: t } 作为第二个参数来手动传递事务. 要将事务自动传递给所有查询,你必须安装 cls-hooked (CLS) 模块,并在自己的代码中实例化命名空间：

```javascript
const cls = require('cls-hooked');
const namespace = cls.createNamespace('my-very-own-namespace');
```

要启用 CLS,你必须通过使用 sequelize 构造函数的静态方法来告诉 sequelize 使用哪个命名空间：

```javascript
const Sequelize = require('sequelize');
Sequelize.useCLS(namespace);

new Sequelize(....);
```

注意,**useCLS() 方法在 构建器 上,而不在 sequelize 实例上**. 这意味着所有实例将共享相同的命名空间,并且 CLS 是全有或全无 - 你不能仅对某些实例启用它.

CLS 的工作方式类似于用于回调的线程本地存储. 实际上,这意味着不同的回调链可以使用 CLS 命名空间访问局部变量. 启用 CLS 时,sequelize 将在创建新事务时在命名空间上设置 transaction 属性. 由于在回调链中设置的变量是该链的私有变量,因此可以同时存在多个并发事务：

```javascript
sequelize.transaction((t1) => {
  namespace.get('transaction') === t1; // true
});

sequelize.transaction((t2) => {
  namespace.get('transaction') === t2; // true
});
```

在大多数情况下,你不需要直接访问 namespace.get('transaction'),因为所有查询都会自动在命名空间上查找事务：

```javascript
sequelize.transaction((t1) => {
  // 启用 CLS 后,将在事务内部创建用户
  return User.create({ name: 'Alice' });
});
```

### 并发/部分事务

你可以在一系列查询中进行并发事务,也可以将某些事务排除在任何事务之外. 使用 transaction 参数来控制查询属于哪个事务：

注意: SQLite 不支持同时多个事务.

#### 启用CLS

```javascript
sequelize.transaction((t1) => {
  return sequelize.transaction((t2) => {
    // 启用 CLS 后,此处的查询默认情况下将使用 t2.
    // 传递 `transaction` 参数以定义/更改它们所属的事务.
    return Promise.all([
        User.create({ name: 'Bob' }, { transaction: null }),
        User.create({ name: 'Mallory' }, { transaction: t1 }),
        User.create({ name: 'John' }) // 这将默认为 t2
    ]);
  });
});
```

### 传递参数

sequelize.transaction 方法接受参数.

对于非托管事务,只需使用 sequelize.transaction(options).

对于托管交易,请使用 sequelize.transaction(options, callback).

### 隔离级别

启动事务时可能使用的隔离级别：

```javascript
const { Transaction } = require('sequelize');

// 以下是有效的隔离级别:
Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED // "READ UNCOMMITTED"
Transaction.ISOLATION_LEVELS.READ_COMMITTED // "READ COMMITTED"
Transaction.ISOLATION_LEVELS.REPEATABLE_READ  // "REPEATABLE READ"
Transaction.ISOLATION_LEVELS.SERIALIZABLE // "SERIALIZABLE"
```

默认情况下,sequelize 使用数据库的隔离级别. 如果要使用其他隔离级别,请传入所需的级别作为第一个参数：

```javascript
const { Transaction } = require('sequelize');

await sequelize.transaction({
  isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
}, async (t) => {
  // 你的代码
});
```

你还可以使用 Sequelize 构造函数中的一个参数来全局覆盖 isolationLevel 设置：

```javascript
const { Sequelize, Transaction } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:', {
  isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
});
```

### 与其他 sequelize 方法一起使用

transaction 参数与大多数其他参数一起使用,通常是方法的第一个参数.

对于带有值的方法,例如 .create,.update() 等.transaction 应该传递给第二个参数.

```javascript
await User.create({ name: 'Foo Bar' }, { transaction: t });

await User.findAll({
  where: {
    name: 'Foo Bar'
  },
  transaction: t
});
```

### afterCommit hook

一个 transaction 对象允许跟踪它是否以及何时被提交.

可以将 afterCommit hook 添加到托管和非托管事务对象中：

```javascript
// 托管事务:
await sequelize.transaction(async (t) => {
  t.afterCommit(() => {
    // 你的代码
  });
});

// 非托管事务:
const t = await sequelize.transaction();
t.afterCommit(() => {
  // 你的代码
});
await t.commit();
```

传递给 afterCommit 的回调可以是 async. 在这种情况下：

+ 对于托管交易：sequelize.transaction 调用将在完成之前等待它;
+ 对于非托管交易：t.commit 调用将在完成之前等待它.

注意:

+ 如果事务回滚,则不会引发 afterCommit hook;
+ afterCommit hook 不修改事务的返回值(与大多数 hook 不同)

你可以将 afterCommit hook 与模型 hook 结合使用,以了解何时保存实例并在事务外部可用

```javascript
User.afterSave((instance, options) => {
  if (options.transaction) {
    // 在事务中保存完成,
    // 等待事务提交以通知侦听器实例已保存
    options.transaction.afterCommit(() => /* 通知 */)
    return;
  }
  // 在事务外保存完成,使调用者可以安全地获取更新的模型
  // 通知
});
```


