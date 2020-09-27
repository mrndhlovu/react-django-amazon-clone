import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./ActionTypes";
import { fireAction } from "./action.helpers";

export const addToCart = (data) => {
  return (dispatch) => {
    dispatch(fireAction(ADD_TO_CART, data));
  };
};

export const removeFromCart = (data) => {
  return (dispatch) => {
    dispatch(fireAction(REMOVE_FROM_CART, data));
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch(fireAction(CLEAR_CART));
  };
};
