import { BaseRouter } from './baseRouter';

export class HistoryRouter extends BaseRouter {
  constructor(opts) {
    super(opts);
    this.handler();
    window.addEventListener('popstate', e => {
      console.log('触发popstate');
      this.handler();
    }) 
  }
  handler() {
    this.render(this.getState());
  }
  getState() {
    const path = window.location.pathname;
    return path ? path : '/';
  }
  push(path) {
    history.pushState(null, null, path);
    this.handler();
  }
  replace(path) {
    history.replace(null, null, path);
    this.handler();
  }
  go(n) {
    window.history.go(n);
  }
}