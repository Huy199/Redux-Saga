import React, { Fragment, useEffect } from 'react';
import cityApi from 'api/cityApi';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/layout';
import { NotFound } from 'components/common';
import { PrivateRoute } from './components/common/PrivateRoute';

function App() {
  useEffect(() => {
    cityApi.getAll().then((response) => console.log('response: ', response));
  });
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
