import React, {Suspense} from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import Error from '@/components/Error'

const Home = React.lazy(_ => import('@/pages/home'))
const Detail = React.lazy(_ => import('@/pages/detail'))
// import Category from './Category/category';
// import Player from './Player/player';
// import LiveList from './LiveList/LiveList';
// import LivePlatform from './LivePlatform/LivePlatform';


const App = () => (
  <BrowserRouter basename='/'>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/:page/:id' component={Detail} />
    </Switch>
  </BrowserRouter>
)
export default function Main() {
  const data = {
    status: 3
  }
  return (
    <Suspense fallback={<Error data={data} />}>
      <App />
    </Suspense>
  );
};
