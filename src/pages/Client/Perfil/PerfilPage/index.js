import React, { Component } from "react";
import { connect } from "react-redux";
import { Steps, Icon, Input, Button, Select } from "antd";
import * as R from "ramda";

import "./index.css";

import ButtonMenu from "../../../../components/ButtonMenu";
import { profileUpdate, getById } from "../../../../services/client";
import { contactUpdate } from "../../../../services/contact";
import {
  getAddressByZipCode,
  createAddress
} from "../../../../services/address";

import { validator, masks } from "./validator";
import { Redirect } from "react-router-dom";

const { Step } = Steps;
const { Option } = Select;

class ProfilePage extends Component {
  state = {
    current: 0,
    cpf: "",
    rg: "",
    name: "",
    givenName: "",
    familyName: "",
    email: "",
    telphones: [],
    fieldFalha: {
      cpf: false,
      rg: false,
      name: false,
      givenName: false,
      familyName: false,
      email: false,
      street: false,
      number: false,
      complement: false,
      city: false,
      state: false,
      neighborhood: false,
      referencePoint: false,
      zipCode: false
    },
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    neighborhood: "",
    referencePoint: "",
    zipCode: "",
    redirect: false
  };

  componentDidMount = async () => {
    const { status, data } = await getById({ id: this.props.auth.clientId });

    console.log(data);
    if (status === 200) {
      const { value: cpf } = masks("cpf", data.cpf);
      const { value: rg } = masks("rg", data.rg);
      const { value: name } = masks("name", data.name);

      const { value: contactId } = masks("name", data.contact.id);
      const { value: givenName } = masks("name", data.contact.givenName);
      const { value: familyName } = masks("name", data.contact.familyName);
      const { value: email } = masks("name", data.contact.email);

      const { address } = data;

      if (data) {
        const { value: zipCode } = masks("name", address.zipCode);
        const { value: street } = masks("name", address.street);
        const { value: number } = masks("name", address.number);
        const { value: complement } = masks("name", address.complement);
        const { value: city } = masks("name", address.city);
        const { value: state } = masks("name", address.state);
        const { value: neighborhood } = masks("name", address.neighborhood);
        const { value: referencePoint } = masks("name", address.referencePoint);
        const { value: addressId } = masks("name", address.id);

        this.setState({
          zipCode,
          street,
          number,
          complement,
          city,
          state,
          neighborhood,
          referencePoint,
          addressId
        });
      }

      let { telphones } = data.contact;
      telphones =
        telphones.length === 0
          ? [
              {
                type: "outro",
                phone: ""
              }
            ]
          : telphones;
      this.setState({
        cpf,
        rg,
        name,
        givenName,
        familyName,
        email,
        telphones,
        contactId,
        addressId: address && address.id
      });
    }
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

  updateProfile = async () => {
    const { rg, cpf, name } = this.state;
    const { clientId } = this.props.auth;

    const value = {
      name,
      rg: rg.replace(/\W/gi, ""),
      cpf: cpf.replace(/\W/gi, ""),
      id: clientId
    };

    const { status, data } = await profileUpdate(value);

    if (status === 200) {
      this.next();
    }
  };

  updateContact = async () => {
    const {
      contactId: id,
      givenName,
      familyName,
      email,
      telphones
    } = this.state;

    const value = { id, givenName, familyName, email, telphones };

    const { status } = await contactUpdate(value);

    if (status === 200) {
      this.next();
    }
  };

  createOrUpdateAddress = async () => {
    const {
      zipCode,
      street,
      number,
      complement,
      city,
      state,
      neighborhood,
      referencePoint,
      addressId
    } = this.state;

    const value = {
      zipCode,
      street,
      number,
      complement,
      city,
      state,
      neighborhood,
      referencePoint,
      clientId: this.props.auth.clientId
    };

    if (!addressId) {
      const { status, data } = await createAddress(value);
      console.log(status, data);
    }

    this.setState({
      redirect: true
    });
  };

  onChange = e => {
    const { name, value } = masks(e.target.name, e.target.value);
    this.setState({
      [name]: value
    });
  };

  onChangeTelphones = e => {
    const { name, value } = masks(e.target.name, e.target.value);
    const { telphones } = this.state;

    // console.log(e.target.id);

    telphones[e.target.id] = {
      ...telphones[e.target.id],
      [name]: value
    };

    this.setState({
      telphones
    });
  };

  onChangeItem = (value, e) => {
    const { telphones } = this.state;

    telphones[e.key] = {
      ...telphones[e.key],
      type: value
    };

    this.setState({
      telphones
    });
  };

  onBlur = async e => {
    const { name, value } = e.target;
    let { fieldFalha } = validator(name, value, this.state);

    if (name === "zipCode" && !fieldFalha[name]) {
      const { status, data } = await getAddressByZipCode(value);
      // console.log(status, data);

      if (status !== 200 || R.has("erro", data)) {
        fieldFalha = {
          ...fieldFalha,
          [name]: true
        };
      } else {
        const {
          bairro: neighborhood,
          localidade: city,
          logradouro: street,
          uf: state,
          complemento: referencePoint
        } = data;
        this.setState({ neighborhood, city, street, state, referencePoint });
      }
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

  process = () => {
    const { current } = this.state;

    switch (current) {
      case 0:
        return (
          <>
            <h1>Pessoal</h1>
            <div>
              <label>name</label>
              <Input
                name="name"
                value={this.state.name}
                className={`input-login ${this.state.fieldFalha.name &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>cpf</label>
              <Input
                name="cpf"
                value={this.state.cpf}
                className={`input-login ${this.state.fieldFalha.cpf &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>rg</label>
              <Input
                className={`input-login ${this.state.fieldFalha.rg &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                name="rg"
                value={this.state.rg}
                onFocus={this.onFocus}
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h1>Contato</h1>
            <div>
              <label>givenName</label>
              <Input
                className={`input-login ${this.state.fieldFalha.givenName &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                name="givenName"
                value={this.state.givenName}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>familyName</label>
              <Input
                className={`input-login ${this.state.fieldFalha.familyName &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                name="familyName"
                value={this.state.familyName}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>email</label>
              <Input
                className={`input-login ${this.state.fieldFalha.email &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                name="email"
                value={this.state.email}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>name</label>
            </div>
            {this.state.telphones.map((telphone, index) => {
              return (
                <div style={{ margin: "20px" }}>
                  <Select
                    style={{ width: 120 }}
                    value={telphone.type}
                    onChange={this.onChangeItem}
                  >
                    {["celular", "residencial", "outro", "comercial"].map(
                      type => {
                        return (
                          <Option key={index} value={type}>
                            {type.slice(0, 1).toUpperCase() + type.slice(1)}
                          </Option>
                        );
                      }
                    )}
                  </Select>
                  <Input
                    name="phone"
                    value={telphone.phone}
                    onChange={this.onChangeTelphones}
                    id={index}
                  />
                </div>
              );
            })}
          </>
        );
      case 2:
        return (
          <>
            <h1>Endereço</h1>
            <div>
              <label>zipCode</label>
              <Input
                name="zipCode"
                value={this.state.zipCode}
                className={`input-login ${this.state.fieldFalha.zipCode &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>street</label>
              <Input
                name="street"
                value={this.state.street}
                className={`input-login ${this.state.fieldFalha.street &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>number</label>
              <Input
                name="number"
                value={this.state.number}
                className={`input-login ${this.state.fieldFalha.number &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>complement</label>
              <Input
                name="complement"
                value={this.state.complement}
                className={`input-login ${this.state.fieldFalha.complement &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>city</label>
              <Input
                name="city"
                value={this.state.city}
                className={`input-login ${this.state.fieldFalha.city &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>state</label>
              <Input
                name="state"
                value={this.state.state}
                className={`input-login ${this.state.fieldFalha.state &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>neighborhood</label>
              <Input
                name="neighborhood"
                value={this.state.neighborhood}
                className={`input-login ${this.state.fieldFalha.neighborhood &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div>
              <label>referencePoint</label>
              <Input
                name="referencePoint"
                value={this.state.referencePoint}
                className={`input-login ${this.state.fieldFalha
                  .referencePoint && "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
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
            <Button type="primary" onClick={() => this.updateProfile()}>
              Avançar
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <Button type="primary" onClick={() => this.updateContact()}>
              Avançar 2
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              voltar
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => this.createOrUpdateAddress()}
            >
              Finalizar
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  onChangeSteps = current => {
    this.setState({ current });
  };

  renderRedirect = () => {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect push to="/client/monitoramento" />;
    }
  };
  render() {
    console.log(this.state);
    const { current } = this.state;
    return (
      <>
        {this.renderRedirect()}
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

export default connect(mapStateToProps)(ProfilePage);
