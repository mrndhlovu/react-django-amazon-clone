import {
  UPDATE_CART,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_ERROR,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_ERROR,
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  CLEAR_CART,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_ERROR,
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  PAYMENT_INTENT_SUCCESS,
  PAYMENT_INTENT_ERROR,
  PAYMENT_INTENT,
  COMPLETE_ORDER,
  COMPLETE_ORDER_SUCCESS,
  COMPLETE_ORDER_ERROR,
  GET_COMPLETED_ORDERS,
  COMPLETED_ORDERS_SUCCESS,
  COMPLETED_ORDERS_ERROR,
} from "./ActionTypes";
import { fireAction } from "./action.helpers";
import {
  requestCartUpdate,
  requestClearCart,
  requestRemoveFromCart,
  requestShoppingBasketDetails,
  requestPaymentIntent,
  requestCheckoutOrder,
  requestCompletedOrders,
} from "../api/product.requests";

export const addToCartAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(ADD_TO_CART));
    requestCartUpdate({
      quantity: data.quantity,
      productId: data.id,
    })
      .then((response) => {
        dispatch(fireAction(ADD_TO_CART_SUCCESS, response.data));
      })
      .catch(() => {
        dispatch(fireAction(ADD_TO_CART_ERROR));
      });
  };
};

export const removeFromCartAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(REMOVE_FROM_CART));
    requestRemoveFromCart(data)
      .then((response) =>
        dispatch(fireAction(REMOVE_FROM_CART_SUCCESS, response.data))
      )
      .catch(() => {
        dispatch(fireAction(REMOVE_FROM_CART_ERROR));
      });
  };
};

export const clearCartAction = () => {
  return (dispatch) => {
    dispatch(fireAction(CLEAR_CART));
    requestClearCart()
      .then((response) =>
        dispatch(fireAction(CLEAR_CART_SUCCESS, response.data))
      )
      .catch(() => {
        dispatch(fireAction(CLEAR_CART_ERROR));
      });
  };
};

export const updateQuantityAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(UPDATE_CART));
    requestCartUpdate({
      quantity: parseInt(data.quantity, 10),
      productId: data.id,
    })
      .then((response) =>
        dispatch(fireAction(UPDATE_CART_SUCCESS, response.data))
      )
      .catch(() => {
        dispatch(fireAction(UPDATE_CART_ERROR));
      });
  };
};

export const getShoppingBasketAction = () => {
  return (dispatch) => {
    dispatch(fireAction(GET_CART));
    requestShoppingBasketDetails()
      .then((response) => dispatch(fireAction(GET_CART_SUCCESS, response.data)))
      .catch(() => {
        dispatch(fireAction(GET_CART_ERROR));
      });
  };
};

export const getCompletedOrdersAction = () => {
  return (dispatch) => {
    dispatch(fireAction(GET_COMPLETED_ORDERS));
    requestCompletedOrders()
      .then((response) =>
        dispatch(fireAction(COMPLETED_ORDERS_SUCCESS, response.data))
      )
      .catch((error) => {
        dispatch(fireAction(COMPLETED_ORDERS_ERROR, error.response.data));
      });
  };
};

export const nextCheckoutStageAction = (action) => {
  return (dispatch) => dispatch(fireAction(action));
};

export const paymentIntentAction = () => {
  return (dispatch) => {
    dispatch(fireAction(PAYMENT_INTENT));
    requestPaymentIntent()
      .then((response) =>
        dispatch(fireAction(PAYMENT_INTENT_SUCCESS, response.data))
      )
      .catch((error) => {
        dispatch(fireAction(PAYMENT_INTENT_ERROR, error.response.data));
      });
  };
};

export const completeOrderAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(COMPLETE_ORDER));
    requestCheckoutOrder(data)
      .then((response) =>
        dispatch(fireAction(COMPLETE_ORDER_SUCCESS, response?.data))
      )
      .catch((error) =>
        dispatch(fireAction(COMPLETE_ORDER_ERROR, error.response?.data))
      );
  };
};
