import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_QUANTITY,
} from "./ActionTypes";
import { fireAction } from "./action.helpers";

export const addToCartAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(ADD_TO_CART, data));
  };
};

export const removeFromCartAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(REMOVE_FROM_CART, data));
  };
};

export const clearCartAction = () => {
  return (dispatch) => {
    dispatch(fireAction(CLEAR_CART));
  };
};

export const updateQuantityAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(UPDATE_QUANTITY, data));
  };
};
