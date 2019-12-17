import React, { Component } from 'react'
import './index.css'
import { Input, Button, Icon } from 'antd'
import { Redirect } from 'react-router-dom'

class ConfirmarCodigoPage extends Component{

  state={
    codigo: '',
  }

  onChangeLogin = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/home' />
    }
  }

  render() {
    return (
      <div className='div-bg-login'>
        <div className='div-card-cadastro'>
          <div className='div-main-form-login'>
            <div className='icon-home-login'>
              {this.renderRedirect()}
              <Icon type="home" style={{ fontSize: '22px', margin: '10px 15px 0 0' }} onClick={this.setRedirect} />
            </div>
            <div className='div-form-login'>
              <h1 className='h1-bv-login'>Confirmar código</h1>
              <p className='p-login'>Obrigado por estar fazendo parte da nossa plataforma online.</p>
              <div className='div-inputs'>
                <h4 className='p-inputs'>Código:</h4>
              <Input
                placeholder="Digite o código"
                className='input-login'
                name='codigo'
                value={this.state.codigo}
                onChange={this.onChangeLogin}
              />
              </div>
              <Button className='button-entrar'>Confirmar</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmarCodigoPage