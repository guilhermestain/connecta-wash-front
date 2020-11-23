import React, { Component } from "react";
import "./index.css";
import { Input, Button, Icon } from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { checkAccount } from "../../../services/user";

class ConfirmarCodigoPage extends Component {
  state = {
    codigo: "",
    redirect: ""
  };

  onChangeLogin = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  setRedirect = () => {
    this.setState({
      redirect: "/home"
    });
  };

  renderRedirect = () => {
    if (this.state.redirect !== "") {
      return <Redirect to="/home" />;
    }
  };

  saveTargetConfirme = async () => {
    const value = {
      id: this.props.check.userId,
      key: this.state.codigo
    };
    const { status } = await checkAccount(value);

    if (status === 200) {
      this.setState({
        redirect: `/login`
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
              <h1 className="h1-bv-login">Confirmar código</h1>
              <p className="p-login">
                Obrigado por estar fazendo parte da nossa plataforma online.
              </p>
              <div className="div-inputs">
                <h4 className="p-inputs">Código:</h4>
                <Input
                  placeholder="Digite o código"
                  className="input-login"
                  name="codigo"
                  value={this.state.codigo}
                  onChange={this.onChangeLogin}
                />
              </div>
              <Button
                className="button-entrar"
                onClick={this.saveTargetConfirme}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    check: state.check
  };
}

export default connect(mapStateToProps)(ConfirmarCodigoPage);
