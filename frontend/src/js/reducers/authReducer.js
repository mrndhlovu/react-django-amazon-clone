import {
  AUTH_USER_ERROR,
  AUTH_USER,
  AUTH_USER_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT,
} from "../actions/ActionTypes";

const INITIAL_STATE = {
  data: {},
  address: {},
  isAuthenticated: false,
  isLoading: false,
  CURRENCY_SYMBOL: "€",
};

const authReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case AUTH_USER_ERROR:
      return { ...state, isLoading: false };
    case AUTH_USER:
      return { ...state, isLoading: true };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        isLoading: false,
        isAuthenticated: true,
        address: action.payload.customer,
      };
    case LOGOUT_ERROR:
      return { ...state, isLoading: false };
    case LOGOUT:
      return { ...state, isLoading: true };
    case LOGOUT_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

export default authReducer;
