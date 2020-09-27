import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  ADD_TO_CART_FAIL,
} from "../actions/ActionTypes";
import { FAKE_PRODUCTS } from "../constants/constants";
import { getSubTotal } from "../utils/appUtils";

const INITIAL_STATE = {
  items: FAKE_PRODUCTS,
  CURRENCY_SYMBOL: "€",
  error: "",
};

const cartReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case ADD_TO_CART_FAIL:
      return { ...state, error: action.payload };
    case ADD_TO_CART:
      return { ...state, items: [...state.items, action.payload] };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload?.id),
      };
    case CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
};

export default cartReducer;
