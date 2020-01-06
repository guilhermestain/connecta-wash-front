import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { redirect } from "../MenuRedux/action";
import MenuClient from "./MenuClient";
import MenuCompany from "./MenuCompany";

class MenuPages extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectPage: this.props.redirectPage.redirect };
  }

  renderRedirect = async () => {
    this.props.redirect({ redirect: "" });
  };

  render() {
    console.log(this.props.auth.typeAccount);
    if (
      this.props.auth.token &&
      this.props.redirectPage.redirect !== "" &&
      this.state.redirectPage !== this.props.redirectPage.redirect
    ) {
      // this.renderRedirect();
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
function mapDispacthToProps(dispach) {
  return bindActionCreators({ redirect }, dispach);
}

function mapStateToProps(state) {
  return {
    redirectPage: state.redirect,
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(MenuPages);
