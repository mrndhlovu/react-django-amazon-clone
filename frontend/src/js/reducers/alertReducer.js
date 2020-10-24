import { SHOW_ALERT, REMOVE_ALERT } from "../actions/ActionTypes";

const INITIAL_STATE = {
  message: undefined,
};

const alertReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...state, message: action.payload };
    case REMOVE_ALERT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default alertReducer;
