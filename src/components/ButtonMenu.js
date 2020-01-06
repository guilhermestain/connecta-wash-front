import React, { Component } from "react";
import { Icon, Button } from "antd";

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
          <Button
            onClick={() => {
              slideout.toggle();
              this.setState({ isOpen: slideout.isOpen() });
            }}
          >
            <Icon type="menu-fold" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              slideout.toggle();
              this.setState({ isOpen: slideout.isOpen() });
            }}
          >
            <Icon type="menu-unfold" />
          </Button>
        )}
      </>
    );
  }
}
