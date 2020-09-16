import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN } from "../actions/ActionTypes";

const INITIAL_STATE = {
  data: {},
  isAuthenticated: false,
  isLoading: false,
};

const loginReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return { ...state, isLoading: false };
    case LOGIN:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default loginReducer;
