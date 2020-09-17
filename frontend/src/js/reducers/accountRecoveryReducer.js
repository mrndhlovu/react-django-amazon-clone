import {
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_ERROR,
  VERIFY_OTP,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  VERIFY_EMAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  UPDATE_PASSWORD,
} from "../actions/ActionTypes";
import { PASSWORD_ASSISTANCE_STAGES } from "../constants/constants";

const INITIAL_STATE = {
  data: {},
  error: {},
  accountRecovered: false,
  isLoading: false,
  hasAccount: false,
  RECOVERY_STAGE: PASSWORD_ASSISTANCE_STAGES.EMAIL,
};

const accountRecoveryReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case VERIFY_EMAIL_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case VERIFY_EMAIL:
      return { ...state, isLoading: true, error: {} };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasAccount: true,
        RECOVERY_STAGE: PASSWORD_ASSISTANCE_STAGES.OPT,
        data: action.payload,
      };

    case VERIFY_OTP_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case VERIFY_OTP:
      return { ...state, isLoading: true, error: {} };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasAccount: true,
        RECOVERY_STAGE: PASSWORD_ASSISTANCE_STAGES.NEW_PASSWORD,
      };

    case UPDATE_PASSWORD_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, isLoading: true, error: {} };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accountRecovered: true,
        error: {},
      };
    default:
      return state;
  }
};

export default accountRecoveryReducer;
