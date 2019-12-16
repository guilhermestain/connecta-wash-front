import action from "../../../store/actions";

export function redirect(value) {
  return dispatch =>
    dispatch({
      type: action.REDIRECT,
      payload: value
    });
}
