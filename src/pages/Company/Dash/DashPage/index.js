import React, { Component } from "react";
import "./index.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ButtonMenu from "../../../../components/ButtonMenu";

import { Logout } from "../../../Login/LoginRedux/action";

class DashPage extends Component {
  render() {
    return (
      <>
        <ButtonMenu />

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
