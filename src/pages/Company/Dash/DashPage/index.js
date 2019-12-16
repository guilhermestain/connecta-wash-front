import React, { Component } from "react";
import "./index.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { slideout } from "../../../../services/slideout";
import { Logout } from "../../../Login/LoginRedux/action";
import { Button } from "antd";

class DashPage extends Component {
  state = {
    redirect: false
  };
  componentDidMount = () => {
    slideout.enableTouch();
  };

  logout = async () => {
    await this.props.Logout(this.props.auth.token);

    this.setState({
      redirect: true
    });
  };

  render() {
    return (
      <>
        {this.state.redirect && <Redirect push to="/home" />}
        <Button onClick={() => this.logout()}>Logout</Button>
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
