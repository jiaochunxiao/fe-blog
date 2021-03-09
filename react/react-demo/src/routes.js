import React from 'react';
import loadable from '@loadable/component';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = loadable(() => import('./App'));
const DragableDemo = loadable(() => import('@/pages/DragableDemo'));
const FormilyDemo = loadable(() => import('@/pages/FormilyDemo'));
const EventDemo = loadable(() => import('@/pages/EventDemo'));

const Routes = () => {
  return (
    <Router exact path='/' component={App}>
      <Route path='/dragabledemo' component={DragableDemo} />
      <Route path='/formilydemo' component={FormilyDemo} />
      <Route path='/eventdemo' component={EventDemo} />
    </Router>
  );
};

export default Routes;
