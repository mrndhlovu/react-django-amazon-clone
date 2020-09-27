import {
  PRODUCT_DETAIL_ERROR,
  PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL,
} from "../actions/ActionTypes";
import { FAKE_PRODUCTS } from "../constants/constants";

const INITIAL_STATE = {
  list: [],
  detail: {},
  isLoading: false,
};

const productsReducer = (state = INITIAL_STATE, action = {}) => {
  const { payload } = action;
  switch (action.type) {
    case GET_PRODUCT_DETAIL:
      return { ...state, detail: FAKE_PRODUCTS[payload.id] };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        items: [...state.items, payload],
      };
    case PRODUCT_DETAIL_ERROR:
      return { ...state };

    default:
      return state;
  }
};

export default productsReducer;
