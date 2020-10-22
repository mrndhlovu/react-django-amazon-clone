import {
  PRODUCT_DETAIL_ERROR,
  PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS_LIST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_ERROR,
  GET_FILTERED_PRODUCTS,
  FILTERED_PRODUCT_LIST_SUCCESS,
  FILTERED_PRODUCT_ERROR,
} from "../actions/ActionTypes";
import { VIEWED_RECENT } from "../utils/localStorageUtils";

const INITIAL_STATE = {
  PRODUCTS: [],
  LIST_DETAIL: {},
  detail: {},
  isLoading: false,
};

const productsReducer = (state = INITIAL_STATE, action = {}) => {
  const { payload } = action;

  switch (action.type) {
    case GET_PRODUCT_DETAIL:
      return { ...state, isLoading: true };
    case PRODUCT_DETAIL_SUCCESS:
      VIEWED_RECENT.includes(payload.id) &&
        VIEWED_RECENT.splice(VIEWED_RECENT.indexOf(payload.id));

      VIEWED_RECENT.unshift(payload.id);
      localStorage.setItem(
        "VIEWED_RECENT",
        JSON.stringify(VIEWED_RECENT.slice(0, 5))
      );

      return {
        ...state,
        detail: payload,
        isLoading: false,
      };
    case PRODUCT_DETAIL_ERROR:
      return { ...state, isLoading: false };

    case GET_PRODUCTS_LIST:
      return { ...state, isLoading: true };

    case PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        PRODUCTS: payload.results,
        isLoading: false,
        LIST_DETAIL: {
          ...state.LIST_DETAIL,
          count: payload.count,
          next: payload.next,
          previous: payload.previous,
        },
      };

    case PRODUCTS_LIST_ERROR:
      return { ...state, isLoading: false };

    case FILTERED_PRODUCT_ERROR:
      return { ...state, isLoading: false };

    case GET_FILTERED_PRODUCTS:
      return { ...state, isLoading: true };

    case FILTERED_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        PRODUCTS: payload.results,
        isLoading: false,
        LIST_DETAIL: {
          ...state.LIST_DETAIL,
          count: payload.count,
          next: payload.next,
          previous: payload.previous,
        },
      };

    default:
      return state;
  }
};

export default productsReducer;
