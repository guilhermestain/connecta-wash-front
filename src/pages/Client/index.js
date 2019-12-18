import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ClientPerfilRoute from "./Perfil";
import ClientDashRoute from "./Dash";

class ClientRoute extends Component {
  state = {
    redirectPage: this.props.redirectPage.redirect
  };

  render() {
    return (
      <Switch>
        <Route exact path="/client/monitoramento" component={ClientDashRoute} />
        <Route path="/client/perfil" component={ClientPerfilRoute} />
        <Redirect to="/client/monitoramento" />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    redirectPage: state.redirect
  };
}

export default connect(mapStateToProps)(ClientRoute);
