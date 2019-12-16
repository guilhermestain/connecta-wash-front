import React, { Component } from 'react'
import './index.css'
import { Input, Button, Icon } from 'antd'
import { Redirect } from 'react-router-dom'

class CadastroEmpresaLoginPage extends Component {

  state = {
    redirect: false,
    razãoSocial: '',
    cnpj: '',
    email: '',
    senha: '',
    confirmSenha: '',
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
              <h1 className='h1-bv-login'>Cadastro da empresa</h1>
              <p className='p-login'>Obrigado por estar fazendo parte da nossa plataforma online.</p>
              <div className='div-inputs'>
                <h4 className='p-inputs'>Razão social:</h4>
              <Input
                placeholder="Digite a razão social"
                className='input-login'
                name='razaoSocial'
                value={this.state.razaoSocial}
                onChange={this.onChangeLogin}
              />
              </div>
              <div className='div-inputs'>
                <h4 className='p-inputs'>Cnpj:</h4>
              <Input
                placeholder="Digite o cnpj"
                className='input-login'
                name='cnpj'
                value={this.state.cnpj}
                onChange={this.onChangeLogin}
              />
              </div>
              <div className='div-inputs'>
                <h4 className='p-inputs'>Email:</h4>
              <Input
                placeholder="Digite seu email"
                className='input-login'
                name='email'
                value={this.state.email}
                onChange={this.onChangeLogin}
              />
              </div>
              <div className='div-inputs'>
                <h4 className='p-inputs'>Senha:</h4>
              <Input.Password
                placeholder="Digite sua senha"
                className='inputsenha-login'
                name='senha'
                value={this.state.senha}
                onChange={this.onChangeLogin}
              />
              </div>
              <div className='div-inputs'>
                <h4 className='p-inputs'>Conrfimar senha:</h4>
              <Input.Password
                placeholder="Confirme sua senha"
                className='inputsenha-login'
                name='confirmSenha'
                value={this.state.confirmSenha}
                onChange={this.onChangeLogin}
              />
              </div>
              <Button className='button-entrar'>Cadastrar</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CadastroEmpresaLoginPage