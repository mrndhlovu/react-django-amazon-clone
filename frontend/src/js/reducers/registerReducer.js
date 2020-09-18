import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "../actions/ActionTypes";

const INITIAL_STATE = {
  data: {},
  error: {},
  isLoading: false,
  isRegistered: false,
};

const registerReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case REGISTER_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case REGISTER:
      return { ...state, isLoading: true, error: {} };
    case REGISTER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: {},
      };
    default:
      return state;
  }
};

export default registerReducer;
