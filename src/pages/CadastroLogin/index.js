import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import CadastroClientLoginPage from './CadastroClientLoginPage'

class CadastroClientLoginRoute extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/cadastroClient' component={CadastroClientLoginPage} />
      </Switch>
    )
  }
}


export default CadastroClientLoginRoute