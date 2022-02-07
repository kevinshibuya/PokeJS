import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RootRoutes } from './routes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RootRoutes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
