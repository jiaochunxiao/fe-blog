import React from 'react';
import loadable from '@loadable/component';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = loadable(() => import('./App'));
const DragableDemo = loadable(() => import('@/pages/DragableDemo'));
const FormilyDemo = loadable(() => import('@/pages/FormilyDemo'));

const Routes = () => {
  return (
    <Router exact path='/' component={App}>
      <Route path='/dragabledemo' component={DragableDemo} />
      <Route path='/formilydemo' component={FormilyDemo} />
    </Router>
  );
};

export default Routes;
