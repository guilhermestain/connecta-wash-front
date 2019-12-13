import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import HomeRoute from "./Home";
import LoginRoute from "./Login";
import CadastroClientLoginRoute from "./CadastroLogin";
import ClientDashRoute from "./Client/Dash";
import CompanyDashRoute from "./Company/Dash";

class PagesRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/home" component={HomeRoute} />
        <Route exact path="/login" component={LoginRoute} />
        <Route
          exact
          path="/cadastroClient"
          component={CadastroClientLoginRoute}
        />
        <Route exact path="/client/dash" component={ClientDashRoute} />
        <Route exact path="/company/dash" component={CompanyDashRoute} />
      </Switch>
    );
  }
}

export default PagesRoute;
