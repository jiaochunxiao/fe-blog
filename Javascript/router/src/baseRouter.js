export class BaseRouter {
  constructor(opts) {
    this.list = opts.list;
    this.container = opts.container ? opts.container : document.getElementById('page');
  }
  render(state) {
    let ele = this.list.find(ele => ele.path === state);
    ele = ele ? ele : this.list.find(ele => ele.path === '*');
    this.container.innerText = ele.component;
  }
}