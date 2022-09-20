## 预先加载

预先加载是一次查询多个模型(一个"主"模型和一个或多个关联模型)的数据的行为. 在 SQL 级别上,这是具有一个或多个 join 的查询.

完成此操作后,Sequelize 将在返回的对象中将适当关联的模型添加到适当命名的自动创建的字段中

在 Sequelize 中,主要通过在模型查找器查询中使用 include 参数(例如,findOne, findAll 等)来完成预先加载.

### 基本示例

```javascript
const User = sequelize.define('user', { name: DataTypes.STRING }, { timestamps: false });
const Task = sequelize.define('task', { name: DataTypes.STRING }, { timestamps: false });
const Tool = sequelize.define('tool', {
  name: DataTypes.STRING,
  size: DataTypes.STRING
}, { timestamps: false });
User.hasMany(Task);
Task.belongsTo(User);
User.hasMany(Tool, { as: 'Instruments' });
```

#### 获取单个关联元素

首先,让我们用其关联的用户加载所有任务：

```javascript
const tasks = await Task.findAll({ include: User });
console.log(JSON.stringify(tasks, null, 2));
```

输出：

```javascript
[{
  "name": "A Task",
  "id": 1,
  "userId": 1,
  "user": {
    "name": "John Doe",
    "id": 1
  }
}]
```

这里,tasks[0].user instanceof User 是 true. 这表明,当 Sequelize 提取关联的模型时,它们将作为模型实例添加到输出对象.

上面,在获取的任务中,关联的模型被添加到名为 user 的新字段中. Sequelize 会根据关联模型的名称自动选择此字段的名称,在适用的情况下(即关联为 hasMany 或 belongsToMany)使用该字段的复数形式. 换句话说,由于Task.belongsTo(User)导致一项任务与一个用户相关联,因此逻辑选择是单数形式(Sequelize 自动遵循该形式).

#### 获取所有关联元素

现在,我们将执行相反的操作,而不是加载与给定任务关联的用户,我们将找到与给定用户关联的所有任务.

方法调用本质上是相同的. 唯一的区别是,现在在查询结果中创建的额外字段使用复数形式(在这种情况下为 tasks),其值是任务实例的数组(而不是上面的单个实例).

```javascript
const users = await User.findAll({ include: Task });
console.log(JSON.stringify(users, null, 2));
```

输出：

```javascript
[{
  "name": "John Doe",
  "id": 1,
  "tasks": [{
    "name": "A Task",
    "id": 1,
    "userId": 1
  }]
}]
```
注意,由于关联是一对多的,因此访问器(结果实例中的tasks属性)是复数的.

