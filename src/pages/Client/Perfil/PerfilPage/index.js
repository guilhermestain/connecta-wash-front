import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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
import { complete } from "../../../Login/LoginRedux/action";

// import { redirect } from "../../../../components/Menu/MenuRedux/action";

import { validator, masks } from "./validator";

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
    contactId: "",
    redirect: false
  };

  componentDidMount = async () => {
    // this.props.redirect({ redirect: "" });
    const { status, data } = await getById({ id: this.props.auth.clientId });

    if (status === 200) {
      const { value: cpf } = masks("cpf", data.cpf);
      const { value: rg } = masks("rg", data.rg);
      const { value: name } = masks("name", data.name);

      const { value: contactId } = masks("name", data.contact.id);
      const { value: givenName } = masks("name", data.contact.givenName);
      const { value: familyName } = masks("name", data.contact.familyName);
      const { value: email } = masks("name", data.contact.email);

      const { address } = data;

      if (address) {
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
      clientId: this.props.auth.clientId,
      userId: this.props.auth.userId
    };

    if (!addressId) {
      const { status, data } = await createAddress(value);

      console.log(status, data);
      if (status === 200) {
        this.props.complete();
      }
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

  addTelphone = () => {
    const { telphones } = this.state;

    telphones.push({
      type: "outro",
      phone: ""
    });

    this.setState({ telphones });
  };

  process = () => {
    const { current } = this.state;

    switch (current) {
      case 0:
        return (
          <>
            <div className="h1-bv-profile">
              <h1>Pessoal</h1>
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">name</label>
              <Input
                name="name"
                value={this.state.name}
                className={`input-profile ${this.state.fieldFalha.name &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">cpf</label>
              <Input
                name="cpf"
                value={this.state.cpf}
                className={`input-profile ${this.state.fieldFalha.cpf &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">rg</label>
              <Input
                className={`input-profile ${this.state.fieldFalha.rg &&
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
            <div className="h1-bv-profile">
              <h1>Contato</h1>
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">givenName</label>
              <Input
                className={`input-profile ${this.state.fieldFalha.givenName &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                name="givenName"
                value={this.state.givenName}
                onFocus={this.onFocus}
              />
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">familyName</label>
              <Input
                className={`input-profile ${this.state.fieldFalha.familyName &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                name="familyName"
                value={this.state.familyName}
                onFocus={this.onFocus}
              />
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">email</label>
              <Input
                className={`input-profile ${this.state.fieldFalha.email &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                name="email"
                value={this.state.email}
                onFocus={this.onFocus}
              />
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">telphones</label>
            </div>
            {this.state.telphones.map((telphone, index) => {
              return (
                <div
                  className="div-inputs-profile"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  {index > 0 && (
                    <div
                      style={{
                        width: "10px",
                        margin: "10px"
                      }}
                    />
                  )}
                  <div style={{ width: "80%", "max-width": "270px" }}>
                    <div className="div-row-inputs-profile">
                      <div className="div-inputs-profile-50">
                        <Select
                          style={{ width: "90%", "max-width": "100px" }}
                          value={telphone.type}
                          onChange={this.onChangeItem}
                        >
                          {["celular", "residencial", "outro", "comercial"].map(
                            type => {
                              return (
                                <Option key={index} value={type}>
                                  {type.slice(0, 1).toUpperCase() +
                                    type.slice(1)}
                                </Option>
                              );
                            }
                          )}
                        </Select>
                      </div>
                      <div
                        className="div-inputs-profile-50"
                        style={{
                          "align-items": "flex-end"
                        }}
                      >
                        <Input
                          name="phone"
                          style={{ width: "100%" }}
                          value={telphone.phone}
                          onChange={this.onChangeTelphones}
                          id={index}
                        />
                      </div>
                    </div>
                  </div>
                  {index > 0 && (
                    <div
                      style={{
                        width: "10px",
                        margin: "10px"
                      }}
                    >
                      <Icon
                        id="delete-row-telphone"
                        onClick={() => {
                          const { telphones } = this.state;

                          telphones.splice(index, 1);

                          this.setState({
                            telphones
                          });
                        }}
                        type="close-circle"
                      />
                    </div>
                  )}
                </div>
              );
            })}
            <div className="div-inputs-profile">
              <div id="buttton-add-telphone">
                <Button onClick={this.addTelphone}>
                  <Icon type="plus" />
                </Button>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="h1-bv-profile">
              <h1>Endereço</h1>
            </div>
            <div className="p-inputs-profile">
              <div className="div-row-inputs-profile">
                <div className="div-inputs-profile-50">
                  <label className="p-inputs-profile">zipCode</label>
                  <Input
                    name="zipCode"
                    value={this.state.zipCode}
                    className={`input-profile ${this.state.fieldFalha.zipCode &&
                      "input-error"}`}
                    style={{ width: "90%" }}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                  />
                </div>
                <div
                  className="div-inputs-profile-50"
                  style={{ "align-items": "flex-end" }}
                >
                  <label className="p-inputs-profile">number</label>
                  <Input
                    name="number"
                    value={this.state.number}
                    className={`input-profile ${this.state.fieldFalha.number &&
                      "input-error"}`}
                    style={{ width: "90%" }}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                  />
                </div>
              </div>
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">street</label>
              <Input
                name="street"
                value={this.state.street}
                className={`input-profile ${this.state.fieldFalha.street &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">complement</label>
              <Input
                name="complement"
                value={this.state.complement}
                className={`input-profile ${this.state.fieldFalha.complement &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">city</label>
              <Input
                name="city"
                value={this.state.city}
                className={`input-profile ${this.state.fieldFalha.city &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">state</label>
              <Input
                name="state"
                value={this.state.state}
                className={`input-profile ${this.state.fieldFalha.state &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>

            <div className="div-inputs-profile">
              <label className="p-inputs-profile">neighborhood</label>
              <Input
                name="neighborhood"
                value={this.state.neighborhood}
                className={`input-profile ${this.state.fieldFalha
                  .neighborhood && "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">referencePoint</label>
              <Input
                name="referencePoint"
                value={this.state.referencePoint}
                className={`input-profile ${this.state.fieldFalha
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
          <div className="div-buttons-profile">
            <div
              className="div-row-buttons-profile"
              style={{ "justify-content": "flex-end" }}
            >
              <div
                className="div-button-profile-50"
                style={{ "align-items": "flex-end" }}
              >
                <Button
                  className="button-profile"
                  type="primary"
                  onClick={() => this.updateProfile()}
                >
                  Avançar
                </Button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="div-buttons-profile">
            <div className="div-row-buttons-profile">
              <div className="div-button-profile-50">
                <Button className="button-profile" onClick={() => this.prev()}>
                  voltar
                </Button>
              </div>
              <div
                className="div-button-profile-50"
                style={{ "align-items": "flex-end" }}
              >
                <Button
                  type="primary"
                  className="button-profile"
                  onClick={() => this.updateContact()}
                >
                  Avançar 2
                </Button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="div-buttons-profile">
            <div className="div-row-buttons-profile">
              <div className="div-button-profile-50">
                <Button className="button-profile" onClick={() => this.prev()}>
                  voltar
                </Button>
              </div>
              <div
                className="div-button-profile-50"
                style={{ "align-items": "flex-end" }}
              >
                <Button
                  type="primary"
                  className="button-profile"
                  onClick={() => this.createOrUpdateAddress()}
                >
                  Finalizar
                </Button>
              </div>
            </div>
          </div>
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
    const { current } = this.state;
    return (
      <>
        {this.renderRedirect()}
        <div className="div-bg-profile">
          <div className="div-button-menu">
            <ButtonMenu />
          </div>
          <div className="div-card-profile">
            <div className="div-main-form-profile">
              <div className="h1-bv-profile">
                <h1>Perfil</h1>
              </div>
              <Steps
                current={current}
                onChange={this.onChangeSteps}
                className="div-steps-profile"
              >
                {this.steps.map(item => (
                  <Step key={item.title} title={item.title} icon={item.icon} />
                ))}
              </Steps>
              <div className="div-form-profile">
                {this.process()}
                {this.buttonsSubmit()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ complete }, dispach);
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(ProfilePage);
