import React, { Component } from "react";
import "./index.css";
import { Button, Icon } from "antd";
import "antd/dist/antd.css";
import { Redirect } from "react-router-dom";
import CarouselComp from "../../../components/Carousel";

// Slideout.enableTouch();

class HomePage extends Component {
  state = {
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    return (
      <div className="div-main-home">
        <div className="div-header">
          <div className="div-menor-header">
            <h1
              style={{ color: "white", margin: "0", fontFamily: "myFirstFont" }}
            >
              <a style={{ color: "inherit" }} href="/home">
                Connecta Wash
              </a>
            </h1>
            {this.renderRedirect()}
            <Button onClick={this.setRedirect} className="button-login">
              Login
            </Button>
          </div>
        </div>

        <div>
          <CarouselComp />
        </div>

        <div className="div-footer">
          <div className="div-contatos-footer">
            {/* <h1 className='h2-contatos'>Contatos</h1> */}
            <div className="div-icons-footer">
              <div className="div-tel-footer">
                <Icon
                  type="instagram"
                  theme="filled"
                  style={{ fontSize: "24px", color: "white" }}
                />
                <h2 className="h2-tel-footer">
                  <a
                    style={{ color: "inherit" }}
                    href="https://www.instagram.com/realponto_oficial/"
                  >
                    @REALPONTO_OFICIAL
                  </a>
                </h2>
              </div>
              <div className="div-tel-footer">
                <Icon
                  type="facebook"
                  theme="filled"
                  style={{ fontSize: "24px", color: "white" }}
                />
                <h2 className="h2-tel-footer">
                  <a
                    style={{ color: "inherit" }}
                    href="https://www.facebook.com/Realponto/"
                  >
                    @REALPONTO
                  </a>
                </h2>
              </div>
              <div className="div-tel-footer">
                <Icon
                  type="mail"
                  theme="filled"
                  style={{ fontSize: "24px", color: "white" }}
                />
                <h2 className="h2-tel-footer">comercial@realponto.com.br</h2>
              </div>
              <div className="div-tel-footer">
                <Icon
                  type="phone"
                  theme="filled"
                  style={{ fontSize: "24px", color: "white" }}
                />
                <h2 className="h2-tel-footer">(11) 4332-4040</h2>
              </div>
            </div>
          </div>
          <div className="div-desenvolvido-footer">
            <h4 className="h2-tel-footer">
              ® Developed by Guilherme Stain and Jessi Leandro ®
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
