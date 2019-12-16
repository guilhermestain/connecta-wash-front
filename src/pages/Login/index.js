import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import uuidValidate from "uuid-validate";
import * as R from "ramda";
import { bindActionCreators } from "redux";

import LoginPage from "./LoginPage";
import { redirect } from "../../components/Menu/MenuRedux/action";

class LoginRoute extends Component {
  hasAuth = R.has("auth");
  hasToken = R.has("token");

  render() {
    if (
      this.hasAuth(this.props) &&
      this.hasToken(this.props.auth) &&
      uuidValidate(this.props.auth.token)
    ) {
      this.props.redirect({
        redirect: `/${this.props.auth.typeAccount}/dash`
      });
      return <Redirect to={`/${this.props.auth.typeAccount}/dash`} />;
    }
    return <LoginPage />;
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ redirect }, dispach);
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(LoginRoute);
