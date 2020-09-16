import {
  GET_USER_ERROR,
  GET_USER,
  GET_USER_SUCCESS,
} from "../actions/ActionTypes";

const INITIAL_STATE = {
  data: {},
  isAuthenticated: false,
  isLoading: false,
};

const authReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_USER_ERROR:
      return { ...state, isLoading: false };
    case GET_USER:
      return { ...state, isLoading: true };
    case GET_USER_SUCCESS:
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

export default authReducer;
