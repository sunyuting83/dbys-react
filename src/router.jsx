import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

const Home = React.lazy(_ => import('@/pages/home'))
const Player = React.lazy(_ => import('@/pages/player'))
const List = React.lazy(_ => import('@/pages/list'))
const Classify = React.lazy(_ => import('@/pages/classify'))
const Favorites = React.lazy(_ => import('@/pages/favorites'))

export default function Main() {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/class/:id' component={Classify} />
      <Route path='/list/:id' component={List} />
      <Route path='/area/:id' component={List} />
      <Route path='/director/:id' component={List} />
      <Route path='/performer/:id' component={List} />
      <Route path='/player/:id' component={Player} />
      <Route path='/favorites' component={Favorites} />
    </Switch>
  );
};
