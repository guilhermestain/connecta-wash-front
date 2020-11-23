import React, { Component } from "react";

import ButtonMenu from "../../../../components/ButtonMenu";
import "./index.css";

// import { Container } from './styles';

export default class CompaniesPage extends Component {
  render() {
    return (
      <>
        <div className="div-bg-9acbd3">
          <div className="div-button-menu">
            <ButtonMenu />
          </div>
          <div className="div-card-main">
            <div className="grid-test">
              <div className="div-card-company">
                <h1>Lavanderia test</h1>
                <p>Rua Paramaribo, 170, Diadema-SP </p>
              </div>
              {/* <div style={{ backgroundColor: "black" }}></div> */}
              <div className="div-card-company">
                <h1>Lavanderia test</h1>
                <p>Rua Paramaribo, 170, Diadema-SP </p>
              </div>
              <div className="div-card-company">
                <h1>Lavanderia test</h1>
                <p>Rua Paramaribo, 170, Diadema-SP </p>
              </div>
              <div className="div-card-company">
                <h1>Lavanderia test</h1>
                <p>Rua Paramaribo, 170, Diadema-SP </p>
              </div>
              <div className="div-card-company">
                <h1>Lavanderia test</h1>
                <p>Rua Paramaribo, 170, Diadema-SP </p>
              </div>
              <div className="div-card-company">
                <h1>Lavanderia test</h1>
                <p>Rua Paramaribo, 170, Diadema-SP </p>
              </div>
              <div className="div-card-company">
                <h1>Lavanderia test</h1>
                <p>Rua Paramaribo, 170, Diadema-SP </p>
              </div>
              <div className="div-card-company">
                <h1>Lavanderia test</h1>
                <p>Rua Paramaribo, 170, Diadema-SP </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
