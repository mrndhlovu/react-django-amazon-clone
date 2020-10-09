import {
  CHECKOUT_PAYMENT,
  CONFIRM_ORDER,
  PAYMENT_INTENT_SUCCESS,
  PAYMENT_INTENT_ERROR,
  PAYMENT_INTENT,
  COMPLETE_ORDER,
  COMPLETE_ORDER_SUCCESS,
  COMPLETE_ORDER_ERROR,
} from "../actions/ActionTypes";
import { CHECKOUT_STAGES } from "../constants/constants";

const INITIAL_STATE = {
  STAGE: CHECKOUT_STAGES.ADDRESS,
  CUSTOMER_CARDS: [],
  orderComplete: false,
  clientSecret: "",
  processing: false,
  error: "",
  succeeded: false,
};

const checkoutReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case CHECKOUT_PAYMENT:
      return { ...state, STAGE: CHECKOUT_STAGES.PAY };
    case CONFIRM_ORDER:
      return { ...state, STAGE: CHECKOUT_STAGES.CONFIRM };

    case PAYMENT_INTENT:
      return { ...state, processing: true };
    case PAYMENT_INTENT_ERROR:
      return { ...state, processing: false, error: action.payload?.message };
    case PAYMENT_INTENT_SUCCESS:
      return {
        ...state,
        clientSecret: action.payload.clientSecret,
        succeeded: true,
        processing: false,
        CUSTOMER_CARDS: action.payload.cards,
      };

    case COMPLETE_ORDER:
      return { ...state, processing: true };
    case COMPLETE_ORDER_ERROR:
      return { ...state, processing: false, error: action.payload?.message };
    case COMPLETE_ORDER_SUCCESS:
      return {
        ...state,
        succeeded: true,
        processing: false,
        CUSTOMER_CARDS: action.payload,
        orderComplete: true,
      };
    default:
      return INITIAL_STATE;
  }
};

export default checkoutReducer;
