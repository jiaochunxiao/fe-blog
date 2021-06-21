## Jest

### jest.config.json

```bash
jest --init
```

### Jest 指标
+ smts


### Jest 匹配器

每次要测试一个值时都会使用expect函数。 你很少会自己调用expect。 相反，您将使用expect及 "matcher" 函数来断言某个值。

+ .toBe(value)
+ .toBeNull()
+ .toBeDefined()
+ .toBeUndefined()
+ .toBeTruthy()
+ .toBeFalsy()
+ .toBeNaN()
+ .toBeGreaterThan(number | bigInt)
+ .not
+ ...

### 钩子函数

#### beforeAll()


#### afterAll()

#### beforeEach()

#### afterEach()


### mock

#### 自动mock

jest.config.json

```json
automock: true

```

设置后自动寻找根目录下的__mocks__内的文件。


#### 手动配置

```javascript
jest.mock('./demo);
```

#### 异步走__mocks__，同步走真是文件

```javascript
const {getNumber} = jest.requreActual('./demo');
```

### TDD （Test Driven Development)

（Red-Green Development)

+ 编写测试用例
+ 运行测试用例，测试用例无法通过测试
+ 编写代码，使测试用例通过测试
+ 优化代码，完成开发
+ 重复上述步骤




**参考**
+ [Testing React Components with react-test-renderer, and the Act API](https://www.valentinog.com/blog/testing-react/)
