import React, { Component } from "react";
import "./index.css";

import { slideout } from "../../../../services/slideout";
import { Icon } from "antd";

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
        {this.state.isOpen ? (
          <Icon
            type="menu-fold"
            style={{ fontSize: "18px", margin: "10px" }}
            onClick={() => {
              slideout.toggle();
              this.setState({ isOpen: slideout.isOpen() });
            }}
          />
        ) : (
            <Icon
              type="menu-unfold"
              style={{ fontSize: "18px", margin: "10px" }}
              onClick={() => {
                slideout.toggle();
                this.setState({ isOpen: slideout.isOpen() });
              }}
            />
          )}
        <h1>Client</h1>
      </>
    );
  }
}

export default DashPage;
