import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// import { Container } from './styles';

import CompaniesPage from "./CompaniesPage";

export default class CompaniesRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/client/lavanderias" component={CompaniesPage} />
      </Switch>
    );
  }
}
