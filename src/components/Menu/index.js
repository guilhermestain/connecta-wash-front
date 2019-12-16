import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { store } from "../../App";
import MenuPages from "./MenuPages";

class Menu extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={MenuPages} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Menu;
