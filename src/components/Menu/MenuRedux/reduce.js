import actions from "../../../store/actions";

const INICIAL_STATE_REDIRECT = {
  redirect: ""
};

const INICIAL_STATE_THEME = {
  theme: "dark"
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

export function theme(state = INICIAL_STATE_THEME, action) {
  switch (action.type) {
    case actions.THEME:
      const theme = action.payload;
      return theme;
    default:
      return state;
  }
}
