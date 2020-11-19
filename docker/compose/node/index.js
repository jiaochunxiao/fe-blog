// const http = require('http');
// const port = process.env.PORT || 8080;

// const requestHandler = function handler(req, res) {
//   res.end(`Hello! This is a simple node server! from ${port}`);
// }

// const server = http.createServer(requestHandler);

// server.listen(port, () => console.log(`Node simple server is now listening on *:${port}`));

const Koa = require('koa');
const Router = require('@koa/router');

const port = process.env.PORT || 8080;

const app = new Koa();
const router = new Router();

router.get('/docker/get', (ctx, next) => {
  ctx.body = {
    code: 0,
    port,
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());


if (!module.parent) {
  app.listen(port);
}