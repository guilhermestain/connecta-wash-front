import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import HomeRoute from './Home';
import LoginRoute from './Login';
import DashRoute from './Dash';
import CadastroClientLoginRoute from './CadastroLogin';

class PagesRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/home' component={HomeRoute} />
        <Route exact path='/login' component={LoginRoute} />
        <Route exact path='/cadastroClient' component={CadastroClientLoginRoute} />
        <Route exact path='/client/dash' component={DashRoute} />
      </Switch>
    )
  }
}

export default PagesRoute