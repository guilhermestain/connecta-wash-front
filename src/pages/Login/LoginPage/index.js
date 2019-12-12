import React, { Component } from 'react'
import './index.css'
import { Input, Button, Icon } from 'antd'
import { Redirect } from 'react-router-dom'

class LoginPage extends Component {

  state = {
    redirect: false,
    email: '',
    senha: '',
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
    console.log(this.state)
    return (
      <div className='div-bg-login'>
        <div className='div-card-login'>
          <div className='div-main-form-login'>
            <div className='icon-home-login'>
              {this.renderRedirect()}
              <Icon type="home" style={{ fontSize: '22px', margin: '10px 15px 0 0' }} onClick={this.setRedirect}/>
            </div>
            <div className='div-form-login'>
              <h1 className='h1-bv-login'>Bem vindos ao Connecta Wash</h1>
              <p className='p-login'>Obrigado por estar fazendo parte da nossa plataforma online.</p>
              <Input
                placeholder="Digite o seu email"
                className='input-login'
                name='email'
                value={this.state.email}
                onChange={this.onChangeLogin}
              />
              <Input.Password
                placeholder="Digite sua senha"
                className='inputsenha-login'
                name='senha'
                value={this.state.senha}
                onChange={this.onChangeLogin}
              />
              <Button className='button-entrar'>Logar</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage