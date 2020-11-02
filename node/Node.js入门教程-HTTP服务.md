## Node HTTP

### 搭建 HTTP 服务器

```javascript
const http = require('http');
const port = 3000;
const hostname = "localhost";

const server = http.createServer((req, res) => {
  console.log(http.METHODS);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('test\n', 'utf-8');
  res.end('Hello world!\n');
});

server.listen(port, () => {
  console.log(`Server is running at ${hostname}:${port}`);
});
```

### 发送HTTP请求

#### GET请求

```javascript
const http = require('http');
const options = {
  path: '/news/wap/fymap2020_data.d.json',
  method: 'GET',
};

const req = http.request('http://interface.sina.cn', options, res => {
  console.log(res.statusCode);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
```

#### POST请求

```javascript
const https = require('https');
const options = {
  path: '/?service=App.Bing.Randstory',
  method: 'POST',
};

const req = https.request('https://api.berryapi.net', options, res => {
  console.log(res.statusCode);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
```
#### PUT 和 DELETE

PUT 和 DELETE 请求使用相同的 POST 请求格式，只需修改 options.method 的值即可。
