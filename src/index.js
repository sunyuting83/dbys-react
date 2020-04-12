import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter
} from 'react-router-dom';
import Error from '@/components/Error';
import App from '@/router';
import '@/components/global.css'
import * as serviceWorker from '@/serviceWorker';
const data = {
  status: 3
}
ReactDOM.render(
  <Suspense fallback={<Error data={data} />}>
    <BrowserRouter basename='/'>
      <App/>
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);
serviceWorker.unregister();