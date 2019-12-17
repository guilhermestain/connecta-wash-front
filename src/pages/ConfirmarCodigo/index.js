import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import ConfirmarCodigoPage from './ConfirmarCodigoPage'

class ConfimarCodigoRoute extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/confirmarCodigo' component={ConfirmarCodigoPage} />
      </Switch>
    )
  }
}


export default ConfimarCodigoRoute