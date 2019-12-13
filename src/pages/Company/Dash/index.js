import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import DashPage from "./DashPage";

class DashRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/company/dash" component={DashPage} />
      </Switch>
    );
  }
}

export default DashRoute;
