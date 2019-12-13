import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { store } from "../../App";

class Menu extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/client" component={MenuClient} />
            <Route path="/company" component={MenuCompany} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Menu;

class MenuClient extends Component {
  render() {
    return <h1>MenuClient</h1>;
  }
}

class MenuCompany extends Component {
  render() {
    return <h1>MenuCompany</h1>;
  }
}
