import React, {useState} from 'react';
import loadable from '@loadable/component';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import './App.css';

const Home = loadable(() => import('@/pages/Home'));
const DragableDemo = loadable(() => import('@/pages/DragableDemo'));
const FormilyDemo = loadable(() => import('@/pages/FormilyDemo'));

const routes = [
  {
    path: "/",
    exact: true,
    title: '主页',
    component: Home
  },
  {
    path: '/draggabledemo',
    exact: true,
    title: '拖拽demo',
    component: DragableDemo
  },
  {
    path: '/formilydemo',
    exact: true,
    title: '表单',
    component: FormilyDemo,
  },
];

const App = props => {
  const {location, history} = props;
  const [currentPath, setCurrentPath] = useState(location.pathname);
  console.log(location.pathname);
  const handleRoute = route => {
    history.push(route.path);
    setCurrentPath(route.path);
  };

  return (
    <div className='App'>
      <div className='side-bar'>
        <ul className='side-bar-menu'>
          {routes.map((route, index) => {
            return (
              <li
                className={`side-bar-menu-item ${currentPath === route.path ? 'side-bar-menu-item-active' : ''}`}
                key={index}
                onClick={handleRoute.bind(this, route)}
              >
                  {route.title}
              </li>
            )
          })}
        </ul>
      </div>
      <div className='content'>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(App);
