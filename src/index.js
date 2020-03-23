import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/router';
import '@/components/global.css'
import * as serviceWorker from '@/serviceWorker';

ReactDOM.render(
    <App/>,
  document.getElementById('root')
);
serviceWorker.unregister();