## JSON Schema

JSON Schema 用于标注和验证JSON 文档的元数据文档。

### 规范

最新版本是2019-09。

#### 规范组成

该规范分为三个部分：JSON Schema Core，JSON Schema Validation，JSON Hyper-Schema。还有一个相关的 Relative JSON Pointers。

|||
|---|---|
|JSON Schema Core	|defines the basic foundation of JSON Schema(定义JSON Schema的基本基础）|
|JSON Schema Validation|	defines the validation keywords of JSON Schema（定义JSON Schema的验证关键字）|
|JSON Hyper-Schema|defines the hyper-media keywords of JSON Schema（定义JSON Schema的超媒体关键字）|
|Relative JSON Pointers|extends the JSON Pointer syntax for relative pointers(扩展了相对指针的JSON指针语法）|

### 示例

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

###