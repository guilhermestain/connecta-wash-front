import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './HomePage'

class HomeRoute extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/home' component={HomePage} />
      </Switch>
    )
  }
}


export default HomeRoute