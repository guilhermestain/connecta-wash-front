import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import CadastroClientLoginRoute from "./CadastroLoginClient";
import ClientRoute from "./Client";
import CompanyDashRoute from "./Company/Dash";
import CadastroEmpresaLoginRoute from "./CadastroLoginEmpresa";
import ConfirmarCodigoRoute from "./ConfirmarCodigo";

class PagesRoute extends Component {
  state = {
    redirectPage: this.props.redirectPage.redirect
  };

  render() {
    console.log(this.state.redirectPage);
    console.log(this.props.redirectPage.redirect);
    console.log(this.state.redirectPage !== this.props.redirectPage.redirect);
    if (this.state.redirectPage !== this.props.redirectPage.redirect) {
      this.setState({ redirectPage: this.props.redirectPage.redirect });
      return <Redirect to={this.props.redirectPage.redirect} />;
    } else {
      return (
        <Switch>
          <Route
            exact
            path="/cadastroClient"
            component={CadastroClientLoginRoute}
          />
          <Route
            exact
            path="/cadastroEmpresa"
            component={CadastroEmpresaLoginRoute}
          />
          <Route
            exact
            path="/confimarCodigo"
            component={ConfirmarCodigoRoute}
          />
          <Route
            exact
            path="/company/monitoramento"
            component={CompanyDashRoute}
          />
          <ClientRoute path="/client" />
        </Switch>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    redirectPage: state.redirect
  };
}

export default connect(mapStateToProps)(PagesRoute);
