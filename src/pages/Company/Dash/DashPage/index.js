import React, { Component } from "react";
import "./index.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { slideout } from "../../../../services/slideout";
import { Logout } from "../../../Login/LoginRedux/action";
import { Icon } from "antd";

class DashPage extends Component {
  state = {
    redirect: false
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
        {this.state.redirect && <Redirect push to="/home" />}
        <h1>Company</h1>
      </>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ Logout }, dispach);
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(DashPage);
