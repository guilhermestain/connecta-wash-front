import action from "../../../store/actions";

export function redirect(value) {
  return dispatch =>
    dispatch({
      type: action.REDIRECT,
      payload: value
    });
}

export function theme(value) {
  return dispatch => {
    dispatch({
      type: action.THEME,
      payload: value
    });
  };
}
