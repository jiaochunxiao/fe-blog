## 验证 & 约束

```javascript
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("user", {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  hashedPassword: {
    type: DataTypes.STRING(64),
    validate: {
      is: /^[0-9a-f]{64}$/i
    }
  }
});

(async () => {
  await sequelize.sync({ force: true });
  // 这是代码
})();
```

### 验证和约束的区别

验证是在纯 JavaScript 中在 Sequelize 级别执行的检查. 如果你提供自定义验证器功能,它们可能会非常复杂,也可能是 Sequelize 提供的内置验证器之一. 如果验证失败,则根本不会将 SQL 查询发送到数据库.

另一方面,约束是在 SQL 级别定义的规则. 约束的最基本示例是唯一约束. 如果约束检查失败,则数据库将引发错误,并且 Sequelize 会将错误转发给 JavaScript(在此示例中,抛出 SequelizeUniqueConstraintError). 请注意,在这种情况下,与验证不同,它执行了 SQL 查询.

### 唯一约束



