## 模型查询(查找器)

Finder 方法是生成 SELECT 查询的方法.

默认情况下,所有 finder 方法的结果都是模型类的实例(与普通的 JavaScript 对象相反). 这意味着在数据库返回结果之后,Sequelize 会自动将所有内容包装在适当的实例对象中. 在少数情况下,当结果太多时,这种包装可能会效率低下. 要禁用此包装并收到简单的响应,请将 { raw: true } 作为参数传递给 finder 方法。

### findAll

在上一教程中已经知道 findAll 方法. 它生成一个标准的 SELECT 查询,该查询将从表中检索所有条目(除非受到 where 子句的限制).

```javascript

Poem.findAll({
  attributes: [
    'author',
    [sequelize.fn('COUNT', sequelize.col('author')), 'count'],
  ],
  group: ['author'],
  order: [[sequelize.col('count'), 'DESC']],
});
// 统计每个作者的诗的数量
// SELECT author, COUNT(author) as count from poem GROUP BY author ORDER BY count DESC;
```

### findByPk

findByPk 方法使用提供的主键从表中仅获得一个条目.

```javascript
const project = await Project.findByPk(123);
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof Project); // true
  // 它的主键是 123
}
```

### findOne

findOne 方法获得它找到的第一个条目(它可以满足提供的可选查询参数).

```javascript
const project = await Project.findOne({ where: { title: 'My Title' } });
if (project === null) {
  console.log('Not found!');
} else {
  console.log(project instanceof Project); // true
  console.log(project.title); // 'My Title'
}
```

### findOrCreate

除非找到一个满足查询参数的结果,否则方法 findOrCreate 将在表中创建一个条目. 在这两种情况下,它将返回一个实例(找到的实例或创建的实例)和一个布尔值,指示该实例是已创建还是已经存在.

```javascript
const [user, created] = await User.findOrCreate({
  where: { usename: 'sdepold' },
  defaults: {
    job: 'Technical Lead JavaScript'
  },
})
console.log(user.username); // sdepold
console.log(user.job); // 这里可能是也可能不是： Technical Lead JavaScript
console.log(created); // 指示此实例是否刚刚创建的布尔值
if (created) {
  console.log(user.job); // Technical Lead JavaScript
}
```

### findAndCountAll

findAndCountAll 方法是结合了 findAll 和 count 的便捷方法. **在处理与分页有关的查询时非常有用**,在分页中,你想检索带有 limit 和 offset 的数据,但又需要知道与查询匹配的记录总数.

当没有提供 group 时, findAndCountAll 方法返回一个具有两个属性的对象：

+ count - 一个整数 - 与查询匹配的记录总数
+ rows - 一个数组对象 - 获得的记录

当提供了 group 时, findAndCountAll 方法返回一个具有两个属性的对象：

+ count - 一个数组对象 - 包含每组中的合计和预设属性
+ rows - 一个数组对象 - 获得的记录
