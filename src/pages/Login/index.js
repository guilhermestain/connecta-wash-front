import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import uuidValidate from "uuid-validate";
import * as R from "ramda";

import LoginPage from "./LoginPage";

class LoginRoute extends Component {
  hasAuth = R.has("auth");
  hasToken = R.has("token");

  render() {
    if (this.hasAuth(this.props)) {
      if (this.hasToken(this.props.auth)) {
        if (uuidValidate(this.props.auth.token)) {
          this.success();

          return <Redirect to={`/${this.props.auth.typeAccount}/dash`} />;
        }
      }
    }
    return <LoginPage />;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(LoginRoute);
