import React, { Component } from "react";
import { Input, Button, Icon } from "antd";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { createUser } from "../../../services/user";
import { validator } from "./validator";
import { createAccount } from "../Redux/action";
import { onSubmit } from "../../Login/LoginRedux/action";

class CadastroClientLoginPage extends Component {
  state = {
    redirect: "",
    nome: "",
    email: "",
    senha: "",
    confirmSenha: "",
    fieldFalha: {
      nome: false,
      email: false,
      senha: false,
      confirmSenha: false
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onBlur = e => {
    const { fieldFalha } = validator(e.target.name, e.target.value, this.state);

    if (
      (e.target.name === "senha" || e.target.name === "confirmSenha") &&
      this.state.senha !== "" &&
      this.state.senha !== "" &&
      this.state.senha !== this.state.confirmSenha
    ) {
      fieldFalha.confirmSenha = true;
    }

    this.setState({
      fieldFalha
    });
  };

  onFocus = e => {
    const { name } = e.target;
    const { fieldFalha } = this.state;

    fieldFalha[name] = false;

    this.setState({
      fieldFalha
    });
  };

  setRedirect = () => {
    this.setState({
      redirect: "/home"
    });
  };

  renderRedirect = () => {
    if (this.state.redirect !== "") {
      return <Redirect to={this.state.redirect} />;
    }
  };

  saveTargetNewUser = async () => {
    const { nome: name, email, senha: password, fieldFalha } = this.state;

    const errors = [
      fieldFalha.nome,
      fieldFalha.email,
      fieldFalha.senha,
      fieldFalha.confirmSenha
    ];

    if (errors.filter(item => item === true).length !== 0) return;

    const value = {
      name,
      email,
      password,
      typeAccount: "client"
    };

    const { status, data } = await createUser(value);

    if (status === 200) {
      this.props.onSubmit({ email, password, typeAccount: "client" });

      this.setState({
        nome: "",
        email: "",
        senha: "",
        confirmSenha: "",
        fieldFalha: {
          nome: false,
          email: false,
          senha: false,
          confirmSenha: false
        },
        redirect: "/confirmarCodigo"
      });

      this.props.createAccount({
        userId: data.id,
        typeAccount: data.typeAccount
      });
    }
  };

  render() {
    return (
      <div className="div-bg-login">
        <div className="div-card-cadastro">
          <div className="div-main-form-login">
            <div className="icon-home-login">
              {this.renderRedirect()}
              <Icon
                type="home"
                style={{ fontSize: "22px", margin: "10px 15px 0 0" }}
                onClick={this.setRedirect}
              />
            </div>
            <div className="div-form-login">
              <h1 className="h1-bv-login">Cadastro do cliente</h1>
              <p className="p-login">
                Obrigado por estar fazendo parte da nossa plataforma online.
              </p>
              <div className="div-inputs">
                <h4 className="p-inputs">Nome:</h4>
                <Input
                  placeholder="Digite seu nome"
                  className={`input-login ${this.state.fieldFalha.nome &&
                    "input-error"}`}
                  name="nome"
                  value={this.state.nome}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  onFocus={this.onFocus}
                />
              </div>
              <div className="div-inputs">
                <h4 className="p-inputs">Email:</h4>
                <Input
                  placeholder="Digite seu email"
                  className={`input-login ${this.state.fieldFalha.email &&
                    "input-error"}`}
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  onFocus={this.onFocus}
                />
              </div>
              <div className="div-inputs">
                <h4 className="p-inputs">Senha:</h4>
                <Input.Password
                  placeholder="Digite sua senha"
                  className={`inputsenha-login ${this.state.fieldFalha.senha &&
                    "input-error"}`}
                  name="senha"
                  value={this.state.senha}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  onFocus={this.onFocus}
                  visibilityToggle={!this.state.fieldFalha.senha}
                />
              </div>
              <div className="div-inputs">
                <h4 className="p-inputs">Conrfimar senha:</h4>
                <Input.Password
                  placeholder="Confirme sua senha"
                  className={`inputsenha-login ${this.state.fieldFalha
                    .confirmSenha && "input-error"}`}
                  name="confirmSenha"
                  value={this.state.confirmSenha}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  onFocus={this.onFocus}
                  visibilityToggle={!this.state.fieldFalha.confirmSenha}
                />
              </div>
              <Button
                className="button-entrar"
                onClick={this.saveTargetNewUser}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ createAccount, onSubmit }, dispach);
}

function mapStateToProps(state) {
  return {
    check: state.check
  };
}

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(CadastroClientLoginPage);
