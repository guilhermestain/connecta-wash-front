import React, { Component } from "react";
import "./index.css";

import { slideout } from "../../../../services/slideout";
import { Logout } from '../../../Login/LoginRedux/action'
import { Button } from "antd";

class DashPage extends Component {
  componentDidMount = () => {
    slideout.enableTouch();
  };
  render() {
    return (
    <>
    <Button onClick={()=> Logout()}>Sair</Button>
    <h1>Client</h1>
    </>)
  }
}

export default DashPage;
