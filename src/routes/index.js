import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import PrivateRoutes from './privateRoutes'

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";

const Routes = () => (
  <BrowserRouter >
    <Switch>
      <Route exact path='/home' component={HomePage} />
      <Route exact path='/login' component={LoginPage} />
      <PrivateRoutes path='/client' />
      <Redirect to='/home' />
    </Switch>
  </BrowserRouter>
)

export default Routes