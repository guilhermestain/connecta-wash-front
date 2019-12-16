import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import MenuClient from "./MenuClient";
import MenuCompany from "./MenuCompany";

class MenuPages extends Component {
  state = {
    redirectPage: this.props.redirectPage.redirect
  };

  render() {
    if (this.state.redirectPage !== this.props.redirectPage.redirect) {
      this.setState({ redirectPage: this.props.redirectPage.redirect });
      return <Redirect to={this.props.redirectPage.redirect} />;
    } else {
      return (
        <Switch>
          <Route path="/client" component={MenuClient} />
          <Route path="/company" component={MenuCompany} />
        </Switch>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    redirectPage: state.redirect
  };
}

export default connect(mapStateToProps)(MenuPages);
