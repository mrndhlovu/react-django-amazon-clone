import {
  ADD_TO_CART,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_ERROR,
  UPDATE_CART,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_ERROR,
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  CLEAR_CART,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_ERROR,
  GET_COMPLETED_ORDERS,
  COMPLETED_ORDERS_SUCCESS,
  COMPLETED_ORDERS_ERROR,
} from "../actions/ActionTypes";

const INITIAL_STATE = {
  BASKET: undefined,
  COMPLETED_ORDERS: undefined,
  CURRENCY_SYMBOL: "€",
  isLoading: false,
};

const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_TO_CART_ERROR:
      return { ...state, isLoading: false };
    case ADD_TO_CART:
      return { ...state, isLoading: true };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        BASKET: payload,
        isLoading: false,
      };

    case COMPLETED_ORDERS_ERROR:
      return { ...state, isLoading: false };
    case GET_COMPLETED_ORDERS:
      return { ...state, isLoading: true };
    case COMPLETED_ORDERS_SUCCESS:
      return {
        ...state,
        COMPLETED_ORDERS: payload.reverse(),
        isLoading: false,
      };

    case GET_CART_ERROR:
      return { ...state, isLoading: false };
    case GET_CART:
      return { ...state, isLoading: true };
    case GET_CART_SUCCESS:
      return {
        ...state,
        BASKET: payload,
        isLoading: false,
      };

    case REMOVE_FROM_CART:
      return { ...state, isLoading: true };

    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        BASKET: payload,
      };

    case REMOVE_FROM_CART_ERROR:
      return { ...state, isLoading: true };

    case CLEAR_CART:
      return { ...state, isLoading: true };

    case CLEAR_CART_ERROR:
      return { ...state, isLoading: false };

    case CLEAR_CART_SUCCESS:
      return { ...state, BASKET: undefined };

    case UPDATE_CART:
      return { ...state, isLoading: true };
    case UPDATE_CART_ERROR:
      return { ...state, isLoading: false };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        BASKET: payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
