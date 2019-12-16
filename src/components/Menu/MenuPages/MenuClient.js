import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Logout } from "../../../pages/Login/LoginRedux/action";
import { redirect } from "../MenuRedux/action";
import { slideout } from "../../../services/slideout";

class MenuClient extends Component {
  state = {
    redirect: false
  };

  logout = async () => {
    await this.props.Logout(this.props.auth.token);

    slideout.close();

    slideout.disableTouch();

    await this.props.redirect({ redirect: "/home" });
  };

  render() {
    console.log(this.props);
    return (
      <>
        {this.state.redirect && <Redirect push to="/home" />}
        <Button onClick={this.logout}>logout</Button>
        <h1>MenuClient</h1>
      </>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ Logout, redirect }, dispach);
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(MenuClient);
