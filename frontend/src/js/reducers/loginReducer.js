import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN,
  VERIFY_ACCOUNT,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_ERROR,
} from "../actions/ActionTypes";
import { LOGIN_STAGES } from "../constants/constants";

const INITIAL_STATE = {
  isAuthenticated: false,
  isLoading: false,
  hasAccount: false,
  LOGIN_STAGE: LOGIN_STAGES.EMAIL,
};

const loginReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case VERIFY_ACCOUNT_ERROR:
      return { ...state, isLoading: false };
    case VERIFY_ACCOUNT:
      return { ...state, isLoading: true };
    case VERIFY_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasAccount: true,
        LOGIN_STAGE: LOGIN_STAGES.PASSWORD,
      };

    case LOGIN_ERROR:
      return { ...state, isLoading: false };
    case LOGIN:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export default loginReducer;
