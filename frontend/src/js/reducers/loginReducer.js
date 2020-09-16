import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  VERIFY_EMAIL,
} from "../actions/ActionTypes";
import { LOGIN_STAGES } from "../constants/constants";

const INITIAL_STATE = {
  data: {},
  error: {},
  isAuthenticated: false,
  isLoading: false,
  hasAccount: false,
  LOGIN_STAGE: LOGIN_STAGES.EMAIL,
};

const loginReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case VERIFY_EMAIL_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case VERIFY_EMAIL:
      return { ...state, isLoading: true, error: {} };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasAccount: true,
        LOGIN_STAGE: LOGIN_STAGES.PASSWORD,
      };
    case LOGIN_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case LOGIN:
      return { ...state, isLoading: true, error: {} };
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isAuthenticated: true,
        error: {},
      };
    default:
      return state;
  }
};

export default loginReducer;
