## 控制器

控制器负责处理传入的请求和向客户端返回响应。

[控制器](./image/Controllers_1.png)

控制器的目的是接收应用的特定请求。路由机制控制哪个控制器接收哪些请求。通常，每个控制器有多个路由，不同的路由可以执行不同的操作。

为了创建一个基本的控制器，我们使用类和装饰器。装饰器将类与所需的元数据相关联，并使 Nest 能够创建路由映射（将请求绑定到相应的控制器）。

### 路由

```javascript
import {Controller, Get} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

使用内置方法，当请求处理程序返回一个 JavaScript 对象或数组时，它将自动序列化为 JSON。但是，当它返回一个 JavaScript 基本类型(例如string、number、boolean)时，Nest 将只发送值，而不尝试序列化它。这使响应处理变得简单：只需要返回值，其余的由 Nest负责。

处理程序的路由是通过连接为控制器声明的（可选）前缀和请求装饰器中指定的任何路由来确定的。由于我们已经为每个 route（cats） 声明了一个前缀，并且没有在装饰器中添加任何路由信息，因此 Nest会将 GET /cats 请求映射到此处理程序。如上所述，该路由包括可选的控制器路由前缀和请求方法装饰器中声明的任何路由。例如，customers 与装饰器组合的路由前缀 @Get('profile') 会为请求生成路由映射 GET /customers/profile

使用这个内置方法，当请求处理程序返回一个 JavaScript 对象或数组时，它将自动序列化为 JSON。但是，当它返回一个 JavaScript 基本类型(例如string、number、boolean)时，Nest 将只发送值，而不尝试序列化它。这使响应处理变得简单：只需要返回值，其余的由 Nest负责。

此外，响应的状态码默认情况下始终为 200，但使用 201 的 POST请求除外。我们可以通过在处理程序级别添加 @HttpCode(...) 装饰器来轻松更改此行为 （状态代码）

我们可以在函数签名通过 @Res() 注入类库特定的 响应对象（例如，Express），使用此函数，您具有使用该对象的响应处理函数。例如，使用 Express，您可以使用类似代码构建响应 response.status(200).send()


> 注意！ 禁止同时使用这两种方法。 Nest 检测处理程序是否正在使用 @Res()或 @Next()，如果两个方法都用了的话, 那么在这里的标准方式就是自动禁用此路由, 你将不会得到你想要的结果

### Request

