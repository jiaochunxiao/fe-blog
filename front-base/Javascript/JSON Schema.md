## 基于JSON Schema & Formily的动态表单的实现

### JSON Schema

JSON Schema 用于标注和验证JSON 文档的元数据文档。

#### 规范

最新版本是2019-09。

##### 规范组成

该规范分为三个部分：JSON Schema Core，JSON Schema Validation，JSON Hyper-Schema。还有一个相关的 Relative JSON Pointers。

|||
|---|---|
|JSON Schema Core	|defines the basic foundation of JSON Schema(定义JSON Schema的基本基础）|
|JSON Schema Validation|	defines the validation keywords of JSON Schema（定义JSON Schema的验证关键字）|
|JSON Hyper-Schema|defines the hyper-media keywords of JSON Schema（定义JSON Schema的超媒体关键字）|
|Relative JSON Pointers|extends the JSON Pointer syntax for relative pointers(扩展了相对指针的JSON指针语法）|

#### 示例

```javascript
json_data = [
  {
    'name': 'Tom',
    'age': 10,
    'city': '北京'
  },
  {
    'name': 'Lily',
    'age': 11,
    'city': '深圳'
  },
  {
    'name': 'Lucy',
    'age': 11,
    'city': '深圳'
  }
];

json_schema = {
  'type': 'array',
  'items': {
    'type': 'object',
    'properties': {
      'name': {
        'type': 'string'
      },
      'age': {
        'type': 'number',
      },
      'city': {
        'type': 'string',
        'enum': ['北京', '深圳']
      }
    }
  }
};

```

### Formily

在 Formily中，主要有三种开发模式：

+ JSON Schema开发表单
  + 该方案主要用于后端动态渲染表单

+ JSX Schema 开发表单
  + 该方案主要用于后端动态渲染表单的过渡形态，Schema 在前端维护，方便未来迁移后端动态渲染模式

+ 纯 JSX 开发表单
  + 该方案主要用于纯前端开发方式，或者在前两个方案的自定义组件内部的开发以复合形态来开发

#### JSON Schema 开发表单

> 在该例子中，只需要了解我们需要用到一个叫 SchemaForm 的组件，同时需要给该组件传递一个叫做 **schema** 的属性，该属性接收一个 json 对象。

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, FormButtonGroup, Submit } from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Input
      }}
      onSubmit={console.log}
      schema={{
        type: 'object',
        'x-component-props': {
          labelCol: 7,
          wrapperCol: 12
        },
        properties: {
          string: {
            type: 'string',
            title: 'String',
            'x-component': 'Input'
          }
        }
      }}
    >
      <FormButtonGroup offset={7}>
        <Submit>提交</Submit>
      </FormButtonGroup>
    </SchemaForm>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

#### JSX Schema开发表单

>JSX Schema 是一种对前端更友好的前端维护 Schema 的开发模式。 主要是使用了 SchemaForm 组件和 SchemaMarkupField 组件，SchemaMarkupField 是一个描述型标签，它不是实际的 UI 组件，只能再 SchemaForm 内部使用，这个标签属性与 JSON Schema 中的 Field 对象是等价的

>**注意：SchemaForm 的子节点不能随意插入任何 div 之类的实际 UI 节点，否则它会被推到 Form 底部去渲染。**

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormButtonGroup,
  Submit,
  SchemaMarkupField as Field
} from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm
    components={{ Input }}
    labelCol={7}
    wrapperCol={12}
    onSubmit={console.log}
  >
    <div style={{ padding: 20, margin: 20, border: '1px solid red' }}>
      这是一个非Field类标签，会被挪到最底部渲染
    </div>
    <Field type="string" title="String" name="string" x-component="Input" />
    <FormButtonGroup offset={7}>
      <Submit>提交</Submit>
    </FormButtonGroup>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### 纯 JSX 开发表单

纯源码开发，没有任何 Schema 束缚，它更简单，更直接，对于一些简单页面，或者 Schema 开发中的自定义组件中，使用纯 JSX 开发模式会更高效

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => (
  <Form labelCol={7} wrapperCol={12} onSubmit={console.log}>
    <div style={{ padding: 20, margin: 20, border: '1px solid red' }}>
      Form组件内部可以随便插入UI元素了
    </div>
    <FormItem label="String" name="string" component={Input} />
    <FormButtonGroup offset={7}>
      <Submit>提交</Submit>
    </FormButtonGroup>
  </Form>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

+ SchemaForm 的 components 属性可以传入任意一个只要满足 value/onChange 属性的组件
+ Field 组件代表每个 json schema 的一个原子描述节点，它的属性与 json schema 完全等价。
+ Field 指定 x-component 的名称会和 SchemaForm 属性传入的 components 映射起来。


```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input } from 'antd'
import 'antd/dist/antd.css'

// 自定义组件 满足 value/onChange属性的组件
const OriginInput = props => {
  const {onChange, ...rest} = props
  const handleChange = e => {
    onChange(e.target.value)
  }
  return <input type="text" onChange={handleChange} />
}

const App = () => {
  return (
    <SchemaForm
      components={{ Input, OriginInput }}
      onSubmit={values => {
        console.log(values)
      }}
    >
      <Field type="string" name="name" title="Name" x-component="Input" />
      <Field type="string" name="address" title="Address" x-component="OriginInput" />
      <FormButtonGroup>
        <Submit>查询</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </SchemaForm>
  )
}

/*
 JSON Schema写法
const App = () => {
  const { form, table } = useFormTableQuery(service)
  return (
    <SchemaForm
      components={{ Input }}
      schema={{
        type:"object",
        properties:{
          name:{
            type:"string",
            title:"Name",
            x-component":"Input"
          }
        }
      }}
      onSubmit={(values)=>{
        console.log(values)
      }}
    >
      <FormButtonGroup>
        <Submit>查询</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </SchemaForm>
  )
}
*/
ReactDOM.render(<App />, document.getElementById('root'))
```

#### 开发查询列表页

+ 使用 React Hook useFormTableQuery 可以快速开发一个查询列表页
+ 调用 useFormTableQuery 会返回 Table 和 Form 属性，只需简单传递给对应组件即可
+ useFormTableQuery 的传入参数是一个返回 Promise 对象的函数，该函数约定了它的出入参形式，如果接口请求出入参不符合这个约定，需要手动转换。