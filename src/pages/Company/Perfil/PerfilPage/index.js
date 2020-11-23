import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Steps, Icon, Input, Button, Select } from "antd";
import * as R from "ramda";

import ButtonMenu from "../../../../components/ButtonMenu";
import { validator, masks } from "./validator";
import { getById, profileUpdate } from "../../../../services/company";
import { contactUpdate } from "../../../../services/contact";
import {
  getAddressByZipCode,
  createAddress
} from "../../../../services/address";

import { complete } from "../../../Login/LoginRedux/action";

const { Step } = Steps;
const { Option } = Select;

class ProfilePage extends Component {
  state = {
    current: 0,
    razaoSocial: this.props.auth.name,
    name: "",
    cnpj: "",
    email: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    neighborhood: "",
    referencePoint: "",
    zipCode: "",
    fieldFalha: {
      razaoSocial: false,
      name: false,
      cnpj: false,
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
    telphones: []
  };

  steps = [
    {
      title: "empresa",
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

  componentDidMount = async () => {
    // this.props.redirect({ redirect: "" });
    const { status, data } = await getById({ id: this.props.auth.companyId });
    console.log(status, data);

    if (status === 200) {
      const { razaoSocial, contact, address } = data;
      const { value: cnpj } = masks("cnpj", data.cnpj);

      const { id: contactId, email, givenName: name } = contact;

      if (address) {
        const {
          street,
          number,
          complement,
          city,
          neighborhood,
          referencePoint,
          addressId
        } = address;
        const { value: zipCode } = masks("name", address.zipCode);
        const { value: state } = masks("name", address.state);

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

      telphones = telphones.map(telphone => {
        const { value: phone } = masks("phone", telphone.phone);
        console.log(phone);
        return {
          ...telphone,
          phone
        };
      });

      this.setState({
        razaoSocial,
        cnpj,
        telphones,
        contactId,
        name,
        email
      });
      console.log(this.state);
    }
  };

  onChangeSteps = current => {
    this.setState({ current });
  };

  onChange = e => {
    const { name, value } = masks(e.target.name, e.target.value);
    this.setState({
      [name]: value
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

  process = () => {
    const { current } = this.state;

    switch (current) {
      case 0:
        return (
          <>
            <div className="h1-bv-profile">
              <h1>empresa</h1>
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">Razão Social</label>
              <Input
                name="razaoSocial"
                value={this.state.razaoSocial}
                className={`input-profile ${this.state.fieldFalha.razaoSocial &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
              />
            </div>
            <div className="div-inputs-profile">
              <label className="p-inputs-profile">CNPJ</label>
              <Input
                name="cnpj"
                value={this.state.cnpj}
                className={`input-profile ${this.state.fieldFalha.cnpj &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
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
              <label className="p-inputs-profile">name</label>
              <Input
                className={`input-profile ${this.state.fieldFalha.name &&
                  "input-error"}`}
                onChange={this.onChange}
                onBlur={this.onBlur}
                name="name"
                value={this.state.name}
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
              <label className="p-inputs-profile">Telphone</label>
            </div>
            {this.state.telphones.map((telphone, index) => {
              return (
                <div className="div-inputs-profile">
                  <Input
                    className="input-profile"
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

  updateProfile = async () => {
    const { razaoSocial, cnpj } = this.state;
    const { companyId } = this.props.auth;

    const value = {
      razaoSocial: razaoSocial,
      cnpj: cnpj.replace(/\W/gi, ""),
      id: companyId
    };

    const { status, data } = await profileUpdate(value);

    if (status === 200) {
      this.next();
    }
  };

  updateContact = async () => {
    const { contactId: id, name, email, telphones } = this.state;

    const value = { id, givenName: name, email, telphones };

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
      companyId: this.props.auth.companyId,
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

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

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

  renderRedirect = () => {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect push to="/company/monitoramento" />;
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
                <h1>test</h1>
              </div>
              <Steps current={current} onChange={this.onChangeSteps}>
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
