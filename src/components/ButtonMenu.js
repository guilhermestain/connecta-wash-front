import React, { Component } from "react";
import { Icon } from "antd";

import { slideout } from "../services/slideout";

export default class ButtonMenu extends Component {
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
      </>
    );
  }
}
