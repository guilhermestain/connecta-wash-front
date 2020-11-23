import actions from "../../../store/actions";

const INICIAL_STATE_USERID = {
  userId: null,
  typeAccount: null
};

export function check(state = INICIAL_STATE_USERID, action) {
  switch (action.type) {
    case actions.CHECK:
      state = {
        userId: action.payload.userId,
        typeAccount: action.payload.typeAccount
      };

      return state;

    case actions.LOGIN.LOGOUT:
      return (state = {});

    default:
      return state;
  }
}
