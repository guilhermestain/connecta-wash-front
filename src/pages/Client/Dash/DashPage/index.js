import React, { Component } from "react";
import "./index.css";

import { slideout } from "../../../../services/slideout";
import { Card } from "antd";

import ButtonMenu from "../../../../components/ButtonMenu";

class DashPage extends Component {
  state = {
    isOpen: slideout.isOpen()
  };

  componentDidMount = () => {
    slideout.enableTouch();
  };

  render() {
    return (
      <>
        <ButtonMenu />
        <div className="div-cards-client-moni">
          <Card className="cards-client-moni">
            <div className="div-info-card-client-moni">
              <div className="div-bola-client-moni">
                <h1 className="h1-card-client-moni">5</h1>
              </div>
              <p
                style={{
                  fontFamily: "myFirstFont",
                  fontSize: "30px",
                  marginLeft: "20px"
                }}
              >
                Lavanderia Leva
              </p>
            </div>
            <p style={{ fontFamily: "myFirstFont", fontSize: "30px" }}>
              Av. Pery Rochet
            </p>
          </Card>

          <Card className="cards-client-moni">
            <div className="div-info-card-client-moni">
              <div className="div-bola-client-moni">
                <h1 className="h1-card-client-moni">13</h1>
              </div>
              <p
                style={{
                  fontFamily: "myFirstFont",
                  fontSize: "30px",
                  marginLeft: "20px"
                }}
              >
                Lavanderia Lava
              </p>
            </div>
            <p style={{ fontFamily: "myFirstFont", fontSize: "30px" }}>
              Av. Pery Rochet
            </p>
          </Card>

          <Card className="cards-client-moni">
            <div className="div-info-card-client-moni">
              <div className="div-bola-client-moni">
                <h1 className="h1-card-client-moni">3</h1>
              </div>
              <p
                style={{
                  fontFamily: "myFirstFont",
                  fontSize: "30px",
                  marginLeft: "20px"
                }}
              >
                Lavanderia Luva
              </p>
            </div>
            <p style={{ fontFamily: "myFirstFont", fontSize: "30px" }}>
              Av. Pery Rochet
            </p>
          </Card>
        </div>
      </>
    );
  }
}

export default DashPage;
