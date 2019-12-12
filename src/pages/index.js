import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import HomeRoute from './Home';
import LoginRoute from './Login';
import DashRoute from './Dash';

class PagesRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/home' component={HomeRoute} />
        <Route exact path='/login' component={LoginRoute} />
        <Route exact path='/client/dash' component={DashRoute} />
      </Switch>
    )
  }
}

export default PagesRoute