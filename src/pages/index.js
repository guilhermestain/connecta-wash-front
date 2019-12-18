import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import CadastroClientLoginRoute from "./CadastroLoginClient";
import ClientDashRoute from "./Client/Dash";
import CompanyDashRoute from "./Company/Dash";
import CadastroEmpresaLoginRoute from "./CadastroLoginEmpresa";
import ConfirmarCodigoRoute from "./ConfirmarCodigo";

class PagesRoute extends Component {
  state = {
    redirectPage: this.props.redirectPage.redirect
  };

  render() {
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
          <Route exact path="/client/monitoramento" component={ClientDashRoute} />
          <Route exact path="/company/dash" component={CompanyDashRoute} />
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
