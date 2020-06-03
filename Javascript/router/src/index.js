import { HashRouter } from './hashRouter';
import { HistoryRouter } from './historyRouter';
import { RouteList } from './list';

const opts = {
  container: document.getElementById('page'),
  list: RouteList
};

const MODE = 'history';

class WebRouter {
  constructor(mode = 'hash', opts) {
    this.router = mode === 'hash' ? new HashRouter(opts) : new HistoryRouter(opts);
  }
  push(path) {
    this.router.push(path);
  }
  replace(path) {
    this.router.replace(path);
  }
  go(n) {
    this.router.go(n);
  }
}

const webRouter = new WebRouter(MODE, opts);

document.querySelector('.menu-list').addEventListener('click', e => {
  const event = e || window.event;
  if (event.target.tagName === 'LI') {
    const url = event.target.dataset.url;
    !url.indexOf('/') ? webRouter.push(url) : webRouter.go(url);
  }
});

