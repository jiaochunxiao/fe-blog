## 获取器, 设置器 & 虚拟字段


Sequelize 允许你为模型的属性定义自定义获取器和设置器.

Sequelize 还允许你指定所谓的 虚拟属性,它们是 Sequelize 模型上的属性,这些属性在基础 SQL 表中实际上并不存在,而是由 Sequelize 自动填充. 它们对于创建自定义属性非常有用, 这也可以简化您的代码.

### 获取器

获取器是为模型定义中的一列定义的 get() 函数：
```javascript
const User = sequelize.define('user', {
  // 假设我们想要以大写形式查看每个用户名
  // 即使它们在数据库本身中不一定是大写的
  username: {
    type: DataTypes.STRING,
    get() {
      const rawValue = this.getDataValue('username');
      return rawValue ? rawValue.toUpperCase() : rawValue;
    }
  }
})
```

就像标准 JavaScript 获取器一样,在读取字段值时会自动调用此获取器：

```javascript
const user = User.build({ usename: 'SuperUser123' });
console.log(user.username); // SUPERUSER123
console.log(user.getDataValue('username')); // SuperUser123
```

### 设置器

设置器是为模型定义中的一列定义的 set() 函数，它接收要设置的值：
```javascript
const User = sequelize.define('user', {
  username: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    set(value) {
      // 在数据库中以明文形式存储密码是很糟糕的
      // 使用适当的哈希函数将密码加密
      this.setDataValue('password', hash(value));
    }
  }
})
```

```javascript
const user = User.build({ username: 'someone', password: 'NotSo§tr0ngP4$SW0RD!' });
console.log(user.password); // '7cfc84b8ea898bb72462e78b4643cfccd77e9f05678ec2ce78754147ba947acc'
console.log(user.getDataValue('password')); // '7cfc84b8ea898bb72462e78b4643cfccd77e9f05678ec2ce78754147ba947acc'
```

Sequelize在将数据发送到数据库之前自动调用了设置器，数据库得到唯一数据是已经散列过得值。

```javascript
const User = sequelize.define('user', {
  username: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    set(value) {
      // 在数据库中以明文形式存储密码是很糟糕的.
      // 使用适当的哈希函数来加密哈希值更好.
      // 使用用户名作为盐更好.
      this.setDataValue('password', hash(this.username + value));
    }
  }
});
```

### 组合获取器和设置器

获取器和设置器都可以在同一字段中定义。

举个例子,假设我们正在建一个 Post 模型,其 content 是无限长度的文本. 假设要提高内存使用率,我们要存储内容的压缩版本.

注意：在这种情况下,现代数据库应会自动进行一些压缩. 这只是为了举例.

```javascript

```

