import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import MessageSucess from './pages/CreatePoint/message-success';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path='/' exact />
      <Route component={CreatePoint} path='/create-point' />
      <Route component={MessageSucess} path='/message' />
    </BrowserRouter>
  );
};

export default Routes;
