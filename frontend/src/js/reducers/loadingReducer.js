import { FETCH_DATA, FETCH_DATA_END } from "../actions/ActionTypes";

const INITIAL_STATE = {
  isLoading: false,
};

const loadingReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, isLoading: true };
    case FETCH_DATA_END:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default loadingReducer;
