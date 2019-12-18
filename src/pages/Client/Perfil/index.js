import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// import { Container } from './styles';

import PerfilPage from "./PerfilPage";

export default class PerfilRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/client/perfil" component={PerfilPage} />
      </Switch>
    );
  }
}
