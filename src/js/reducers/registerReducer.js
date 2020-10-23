import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "../actions/ActionTypes";

const INITIAL_STATE = {
  isLoading: false,
  isRegistered: false,
};

const registerReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case REGISTER_ERROR:
      return { ...state, isLoading: false };
    case REGISTER:
      return { ...state, isLoading: true };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default registerReducer;
