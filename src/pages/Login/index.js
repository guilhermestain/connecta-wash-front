import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import LoginPage from './LoginPage'

class LoginRoute extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/login' component={LoginPage} />
      </Switch>
    )
  }
}


export default LoginRoute