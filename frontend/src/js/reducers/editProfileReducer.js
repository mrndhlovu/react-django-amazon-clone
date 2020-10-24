import {
  EDIT_EMAIL,
  EDIT_NAME,
  EDIT_PASSWORD,
  EDIT_PHONE_NUMBER,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  OPEN_ADDRESS,
  OPEN_LOGIN_SECURITY,
  OPEN_PAYMENTS,
  OPEN_ORDERS,
  OPEN_YOUR_ACCOUNT,
} from "../actions/ActionTypes";

import { MANAGE_ACCOUNT_SECTIONS } from "../constants/constants";

const INITIAL_STATE = {
  BREADCRUMBS: [{ header: "Your Account", redirectTo: OPEN_YOUR_ACCOUNT }],
  OPEN: "",
  actionKey: "",
  ACTIVE_SECTION: MANAGE_ACCOUNT_SECTIONS.ACCOUNT,
};

const editProfileReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        isUpdated: false,
      };
    case EDIT_EMAIL:
      return {
        ...state,
        ACTIVE_SECTION: {
          ...state.ACTIVE_SECTION,
          SUBHEADER: "Edit Your Email",
        },
        BREADCRUMBS: [
          ...state.BREADCRUMBS,
          { header: "Edit Your Email", redirectTo: OPEN_LOGIN_SECURITY },
        ],
      };
    case EDIT_PASSWORD:
      return {
        ...state,
        ACTIVE_SECTION: {
          ...state.ACTIVE_SECTION,
          SUBHEADER: "Edit Your Password",
        },
        BREADCRUMBS: [
          ...state.BREADCRUMBS,
          { header: "Edit Your Password", redirectTo: OPEN_LOGIN_SECURITY },
        ],
      };
    case EDIT_NAME:
      return {
        ...state,
        ACTIVE_SECTION: {
          ...state.ACTIVE_SECTION,
          SUBHEADER: "Edit Your Name",
        },
        BREADCRUMBS: [
          ...state.BREADCRUMBS,
          { header: "Edit Your Name", redirectTo: OPEN_LOGIN_SECURITY },
        ],
      };
    case EDIT_PHONE_NUMBER:
      return {
        ...state,
        ACTIVE_SECTION: {
          ...state.ACTIVE_SECTION,
          SUBHEADER: "Edit Your Phone",
        },
        BREADCRUMBS: [
          ...state.BREADCRUMBS,
          { header: "Edit Your Phone", redirectTo: OPEN_LOGIN_SECURITY },
        ],
      };

    case OPEN_ADDRESS:
      return {
        ...state,
        ACTIVE_SECTION: MANAGE_ACCOUNT_SECTIONS.ADDRESS,

        BREADCRUMBS: [
          ...INITIAL_STATE.BREADCRUMBS,
          { header: "Your Address", redirectTo: OPEN_ADDRESS },
        ],
      };

    case OPEN_LOGIN_SECURITY:
      return {
        ...state,
        ACTIVE_SECTION: MANAGE_ACCOUNT_SECTIONS.LOGIN_SECURITY,
        OPEN: "login-&-security",
        BREADCRUMBS: [
          ...INITIAL_STATE.BREADCRUMBS,
          { header: "Login & Security", redirectTo: OPEN_LOGIN_SECURITY },
        ],
      };

    case OPEN_PAYMENTS:
      return {
        ...state,
        ACTIVE_SECTION: MANAGE_ACCOUNT_SECTIONS.PAYMENTS,
        BREADCRUMBS: [
          ...INITIAL_STATE.BREADCRUMBS,
          { header: "Your Payments", redirectTo: OPEN_PAYMENTS },
        ],
      };

    case OPEN_ORDERS:
      return {
        ...state,
        ACTIVE_SECTION: MANAGE_ACCOUNT_SECTIONS.ORDERS,

        BREADCRUMBS: [
          ...INITIAL_STATE.BREADCRUMBS,
          { header: "Your Orders", redirectTo: OPEN_ORDERS },
        ],
      };

    case OPEN_YOUR_ACCOUNT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

export default editProfileReducer;
