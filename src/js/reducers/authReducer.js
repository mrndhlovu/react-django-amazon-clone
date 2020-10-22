import {
  AUTH_USER_ERROR,
  AUTH_USER,
  AUTH_USER_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
} from "../actions/ActionTypes";

const INITIAL_STATE = {
  data: {},
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
        data: {
          ...state.data,
          ...action.payload,
          address: action.payload?.address,
        },
        isLoading: false,
        isAuthenticated: true,
      };

    case REFRESH_TOKEN_ERROR:
      return { ...state, isLoading: false };
    case REFRESH_TOKEN:
      return { ...state, isLoading: true };
    case REFRESH_TOKEN_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: false };

    case LOGOUT_ERROR:
      return { ...state, isLoading: false };
    case LOGOUT:
      return { ...state, isLoading: true, isAuthenticated: false };
    case LOGOUT_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

export default authReducer;
