import actions from "../../../store/actions";

const INICIAL_STATE_AUTH = {
  token: null,
  userId: null,
  username: "userName",
  email: "email",
  validTonken: false,
  password: "",
  client: null,
  company: null
};

export function auth(state = INICIAL_STATE_AUTH, action) {
  let auth = {
    ...state
  };
  switch (action.type) {
    case actions.LOGIN.AUTH:
      if (action.payload.status === 200) {
        if (action.payload.data) {
          auth = {
            ...auth,
            ...action.payload.data
          };
        }
      }

      return auth;

    case actions.LOGIN.LOGOUT:
      return (state = {});

    case actions.LOGIN.COMPLETE:
      auth = {
        ...auth,
        ...action.payload
      };

      return auth;

    default:
      return state;
  }
}
