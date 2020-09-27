/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  ADD_TO_CART_FAIL,
  UPDATE_QUANTITY,
} from "../actions/ActionTypes";

const INITIAL_STATE = {
  items: [],
  CURRENCY_SYMBOL: "€",
};

const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_TO_CART_FAIL:
      return { ...state, error: payload };
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload?.id),
      };
    case CLEAR_CART:
      return { ...state, items: [] };
    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
