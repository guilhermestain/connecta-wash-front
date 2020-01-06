import { combineReducers } from "redux";

import { auth } from "../pages/Login/LoginRedux/reduce";
import { redirect, theme } from "../components/Menu/MenuRedux/reduce";
import { check } from "../pages/CadastroLoginClient/Redux/reduce";

const appReducer = combineReducers({ auth, redirect, theme, check });

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_AUTH") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
