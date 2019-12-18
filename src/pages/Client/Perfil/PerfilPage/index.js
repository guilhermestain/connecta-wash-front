import React, { Component } from "react";
import { connect } from "react-redux";
import { Steps, Icon, Input, Button } from "antd";

import ButtonMenu from "../../../../components/ButtonMenu";

const { Step } = Steps;

class PerfilPage extends Component {
  state = {
    current: 0,
    cpf: "",
    rg: ""
  };

  steps = [
    {
      title: "Pessoal",
      icon: <Icon type="user" />
    },
    {
      title: "Contato",
      icon: (
        <Icon
          type="contacts"
          style={{
            fontSize: "26px"
          }}
        />
      )
    },
    {
      title: "Endereço",
      icon: <Icon type="user" />
    }
  ];

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  process = () => {
    const { current } = this.state;

    switch (current) {
      case 0:
        return (
          <>
            <h1>Pessoal</h1>
            <Input value={this.props.auth.name} />
            <Input onChange={this.onChange} name="cpf" value={this.state.cpf} />
            <Input onChange={this.onChange} name="rg" value={this.state.rg} />
          </>
        );
      case 1:
        return (
          <>
            <h1>Contato</h1>
            <Input value="givenName" />
            <Input value="familyName" />
            <Input value={this.props.auth.email} />
            <div style={{ margin: "20px" }}>
              <Input value="type" />
              <Input value="phone" />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h1>Endereço</h1>
            <Input value="street" />
            <Input value="number" />
            <Input value="complement" />
            <Input value="city" />
            <Input value="state" />
            <Input value="neighborhood" />
            <Input value="referencePoint" />
            <Input value="zipCode" />
          </>
        );
      default:
        return null;
    }
  };

  buttonsSubmit = () => {
    const { current } = this.state;
    switch (current) {
      case 0:
        return (
          <>
            <Button type="primary" onClick={() => this.next()}>
              Avançar
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  onChangeSteps = current => {
    console.log("onChange:", current);
    this.setState({ current });
  };
  render() {
    const { current } = this.state;

    return (
      <>
        <ButtonMenu />
        <h1>Perfil</h1>
        <div style={{ margin: "10px" }}>
          <Steps current={current} onChange={this.onChangeSteps}>
            {this.steps.map(item => (
              <Step key={item.title} title={item.title} icon={item.icon} />
            ))}
          </Steps>
          {this.process()}
          {this.buttonsSubmit()}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(PerfilPage);
