import { BaseRouter } from './baseRouter';
export class HashRouter extends BaseRouter {
  constructor(opts) {
    super(opts);
    this.handler();
    window.addEventListener('hashchange', e => {
      this.handler();
    });
  }
  // hash 变动，渲染新的页面+
  handler() {
    this.render(this.getState());
  }
  // push 新的页面
  push(hash) {
    window.location.hash = hash;
  }
  // 替换页面
  replace(hash) {
    window.location.replace(this.getUrl(hash));
  }
  // 获取变更后的hash
  getState() {
    const hash = window.location.hash;
    return hash ? hash.slice(1) : '/';
  }
  // 获取页面url
  getUrl(hash) {
    const href = window.location.href;
    const i = href.indexOf('#');
    const base = i >= 0 ? href.slice(0, i) : href;
    return `${base}#${hash}`;
  }
  // 前进Or后退
  go(n) {
    window.history.go(n);
  }
}