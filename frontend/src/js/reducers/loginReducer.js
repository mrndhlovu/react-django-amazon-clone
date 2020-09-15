import {
  GET_CURRENT_FAIL,
  GET_CURRENT_USER,
  GET_USER_SUCCESS,
} from "../actions/ActionTypes";

const INITIAL_STATE = {
  data: {},
  isAuthenticated: false,
  isLoading: false,
};

const loginReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_CURRENT_FAIL:
      return { ...state, isLoading: false };
    case GET_CURRENT_USER:
      return { ...state, isLoading: true };
    case GET_USER_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default loginReducer;
