import action from "../../../store/actions";
import { login, logout } from "../../../services/login";

export function changeValue(e) {
  return {
    type: action.LOGIN.CHANGE_VALUE,
    payload: e.target
  };
}

export function onSubmit(value) {
  return dispatch => {
    login(value).then(resp => {
      dispatch({
        type: action.LOGIN.AUTH,
        payload: resp
      });
    });
  };
}

export function Logout(value) {
  return dispatch => {
    logout(value).then(
      dispatch({
        type: action.LOGIN.LOGOUT,
        payload: null
      })
    );
  };
}

export function complete() {
  return dispatch => {
    dispatch({
      type: action.LOGIN.COMPLETE,
      payload: { complete: true }
    });
  };
}
