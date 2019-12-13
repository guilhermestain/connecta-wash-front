import React, { Component } from "react";
import "./index.css";

import { slideout } from "../../../../services/slideout";

class DashPage extends Component {
  componentDidMount = () => {
    slideout.enableTouch();
  };
  render() {
    return <h1>Client</h1>;
  }
}

export default DashPage;
