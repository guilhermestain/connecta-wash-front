import { combineReducers } from "redux";

import { auth } from "../pages/Login/LoginRedux/reduce";

const appReducer = combineReducers({ auth });

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_AUTH") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
