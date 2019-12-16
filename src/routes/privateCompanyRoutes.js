import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PagesRoute from "../pages";

import { Logout } from "../pages/Login/LoginRedux/action";
import { auth } from "../services/login";

class PrivateRoutes extends Component {
  state = {
    auth: true
  };
  logout = async () => {
    await this.props.Logout(this.props.auth.token);
  };

  auth = async () => {
    const value = {
      token: this.props.auth.token,
      username: this.props.auth.username
    };

    let response = {};

    response = await auth(value).then(resp =>
      this.setState({
        auth: resp ? resp.data : false
      })
    );

    return response;
  };

  componentDidMount = async () => {
    await this.auth();
  };
  render() {
    if (this.state.auth) {
      return (
        <Switch>
          <Route path="/company" component={PagesRoute} />
        </Switch>
      );
    } else {
      this.logout();
      return <Redirect to="/login" />;
    }
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

export default connect(mapStateToProps, mapDispacthToProps)(PrivateRoutes);
