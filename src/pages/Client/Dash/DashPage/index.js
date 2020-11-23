import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import "./index.css";

import { slideout } from "../../../../services/slideout";
import { Card } from "antd";

// import { redirect } from "../../../../components/Menu/MenuRedux/action";
import ButtonMenu from "../../../../components/ButtonMenu";

class DashPage extends Component {
  state = {
    isOpen: slideout.isOpen()
  };

  componentDidMount = () => {
    // this.props.redirect({ redirect: "" });

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
                  fontSize: "28px",
                  marginLeft: "20px",
                  marginBottom: "0px"
                }}
              >
                Lavanderia Leva
              </p>
            </div>
            <div className="div-p-client-moni">
              <p style={{ fontFamily: "myFirstFont", fontSize: "28px" }}>
                Av. Pery Rochet
              </p>
            </div>
          </Card>

          <Card className="cards-client-moni">
            <div className="div-info-card-client-moni">
              <div className="div-bola-client-moni">
                <h1 className="h1-card-client-moni">13</h1>
              </div>
              <p
                style={{
                  fontFamily: "myFirstFont",
                  fontSize: "28px",
                  marginLeft: "20px",
                  marginBottom: "0px"
                }}
              >
                Lavanderia Lava
              </p>
            </div>
            <div className="div-p-client-moni">
              <p style={{ fontFamily: "myFirstFont", fontSize: "28px" }}>
                Av. Pery Rochet
              </p>
            </div>
          </Card>

          <Card className="cards-client-moni">
            <div className="div-info-card-client-moni">
              <div className="div-bola-client-moni">
                <h1 className="h1-card-client-moni">3</h1>
              </div>
              <p
                style={{
                  fontFamily: "myFirstFont",
                  fontSize: "28px",
                  marginLeft: "20px",
                  marginBottom: "0px"
                }}
              >
                Lavanderia Luva
              </p>
            </div>
            <div className="div-p-client-moni">
              <p style={{ fontFamily: "myFirstFont", fontSize: "28px" }}>
                Av. Pery Rochet
              </p>
            </div>
          </Card>
        </div>
      </>
    );
  }
}

// function mapDispacthToProps(dispach) {
//   return bindActionCreators({ redirect }, dispach);
// }

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(DashPage);
