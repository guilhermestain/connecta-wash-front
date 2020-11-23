import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import CadastroEmpresaLoginPage from './CadastroEmpresaLoginPage'

class CadastroEmpresaLoginRoute extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/cadastroEmpresa' component={CadastroEmpresaLoginPage} />
      </Switch>
    )
  }
}


export default CadastroEmpresaLoginRoute