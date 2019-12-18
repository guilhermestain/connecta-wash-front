import action from "../../../store/actions";

export function createAccount(value) {
  return {
    type: action.CHECK,
    payload: value
  };
}
