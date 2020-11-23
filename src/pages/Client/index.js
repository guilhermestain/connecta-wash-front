import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { redirect } from "../../components/Menu/MenuRedux/action";
import { slideout } from "../../services/slideout";

import ClientPerfilRoute from "./Perfil";
import ClientDashRoute from "./Dash";
import CompaniesRoute from "./Companies";

class ClientRoute extends Component {
  state = {
    redirectPage: this.props.redirectPage.redirect
  };

  componentDidMount = () => {
    this.props.redirect({ redirect: "" });

    if (!this.props.auth.complete) {
      slideout.disableTouch();
      slideout.destroy();
    } else {
      slideout.enableTouch();
    }
  };

  render() {
    return (
      <Switch>
        <Route path="/client/perfil" component={ClientPerfilRoute} />
        {!this.props.auth.complete && <Redirect to="/client/perfil" />}
        <Route exact path="/client/monitoramento" component={ClientDashRoute} />
        <Route exact path="/client/lavanderias" component={CompaniesRoute} />
        <Redirect to="/client/monitoramento" />
      </Switch>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ redirect }, dispach);
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    redirectPage: state.redirect
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(ClientRoute);
