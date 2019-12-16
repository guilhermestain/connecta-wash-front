import actions from "../../../store/actions";

const INICIAL_STATE_REDIRECT = {
  redirect: ""
};

export function redirect(state = INICIAL_STATE_REDIRECT, action) {
  switch (action.type) {
    case actions.REDIRECT:
      const auth = {
        ...state,
        ...action.payload
      };

      return auth;

    default:
      return state;
  }
}
