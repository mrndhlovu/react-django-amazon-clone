import {
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  VERIFY_EMAIL,
} from "../actions/ActionTypes";

const INITIAL_STATE = {
  isActiveAccount: false,
  isLoading: false,
};

const verifyUserEmailReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case VERIFY_EMAIL_ERROR:
      return { ...state, isLoading: false };
    case VERIFY_EMAIL:
      return { ...state, isLoading: true };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isActiveAccount: true,
      };
    default:
      return state;
  }
};

export default verifyUserEmailReducer;
