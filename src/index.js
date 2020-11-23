import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Menu from "./components/Menu";
import "./index.css";
import "./services/slideout";
import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<Menu />, document.getElementById("menu"));
ReactDOM.render(<App />, document.getElementById("panel"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
