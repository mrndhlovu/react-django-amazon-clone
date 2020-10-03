import {
  CHECKOUT_PAYMENT,
  CONFIRM_PAYMENT,
  SELECT_CHECKOUT_ADDRESS,
  UPDATE_ADDRESS_SUCCESS,
} from "../actions/ActionTypes";
import { CHECKOUT_STAGES } from "../constants/constants";

const INITIAL_STATE = {
  STAGE: CHECKOUT_STAGES.ADDRESS,
};

const checkoutReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case UPDATE_ADDRESS_SUCCESS:
      return { ...state, STAGE: CHECKOUT_STAGES.PAY };
    case SELECT_CHECKOUT_ADDRESS:
      return { ...state, STAGE: CHECKOUT_STAGES.ADDRESS };
    case CHECKOUT_PAYMENT:
      return { ...state, STAGE: CHECKOUT_STAGES.PAY };
    case CONFIRM_PAYMENT:
      return { ...state, STAGE: CHECKOUT_STAGES.CONFIRM };

    default:
      return state;
  }
};

export default checkoutReducer;
