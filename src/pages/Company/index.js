import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import DashPage from "./Dash";
import PerfilPage from "./Perfil";
import { redirect } from "../../components/Menu/MenuRedux/action";
import { slideout } from "../../services/slideout";

class DashRoute extends Component {
  componentDidMount = () => {
    this.props.redirect({ redirect: "" });

    slideout.enableTouch();
  };
  render() {
    return (
      <Switch>
        <Route exact path="/company/perfil" component={PerfilPage} />
        {!this.props.auth.complete && <Redirect to="/company/perfil" />}

        <Route exact path="/company/monitoramento" component={DashPage} />
        <Redirect to="/company/monitoramento" />
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

export default connect(mapStateToProps, mapDispacthToProps)(DashRoute);
