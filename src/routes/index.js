import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import PrivateClientRoutes from "./privateClientRoutes";
import PrivateCompanyRoutes from "./privateCompanyRoutes";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import CadastroClientLoginPage from "../pages/CadastroLogin/CadastroClientLoginPage";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/cadastroClient" component={CadastroClientLoginPage} />
      <PrivateClientRoutes path="/client" />
      <PrivateCompanyRoutes path="/company" />
      <Redirect to="/home" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
