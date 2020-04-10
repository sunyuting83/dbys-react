import React, {Suspense} from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Error from '@/components/Error'

const Home = React.lazy(_ => import('@/pages/home'))
const Player = React.lazy(_ => import('@/pages/player'))
const List = React.lazy(_ => import('@/pages/list'))

export default function Main() {
  const data = {
    status: 3
  }
  return (
    <Suspense fallback={<Error data={data} />}>
      <BrowserRouter basename='/'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/list/:id' component={List} />
          <Route path='/player/:id' component={Player} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};
