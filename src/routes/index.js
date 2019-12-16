import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import PrivateClientRoutes from "./privateClientRoutes";
import PrivateCompanyRoutes from "./privateCompanyRoutes";
import { connect } from "react-redux";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import CadastroClientLoginPage from "../pages/CadastroLogin/CadastroClientLoginPage";
import CadastroEmpresaLoginPage from "../pages/CadastroLoginEmpresa/CadastroEmpresaLoginPage";

class Routes extends Component {
  state = {
    redirectPage: this.props.redirectPage.redirect
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route
            exact
            path="/cadastroClient"
            component={CadastroClientLoginPage}
          />
          <PrivateClientRoutes path="/client" />
          <PrivateCompanyRoutes path="/company" />
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    redirectPage: state.redirect
  };
}

export default connect(mapStateToProps)(Routes);
