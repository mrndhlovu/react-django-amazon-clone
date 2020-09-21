import {
  EDIT_EMAIL,
  EDIT_LOGIN_SECURITY,
  EDIT_NAME,
  EDIT_PASSWORD,
  EDIT_PHONE_NUMBER,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
} from "../actions/ActionTypes";

const INITIAL_STATE = {
  breadcrumb: "Your Account",
  EDITING: undefined,
  header: true,
  isUpdated: false,
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
        breadcrumb: "Change Email",
        EDITING: EDIT_EMAIL,
        header: false,
      };
    case EDIT_PASSWORD:
      return {
        ...state,
        breadcrumb: "Change Password",
        EDITING: EDIT_PASSWORD,
      };
    case EDIT_NAME:
      return { ...state, breadcrumb: "Change Name", EDITING: EDIT_NAME };
    case EDIT_PHONE_NUMBER:
      return {
        ...state,
        breadcrumb: "Change Phone number",
        EDITING: EDIT_PHONE_NUMBER,
      };
    case EDIT_LOGIN_SECURITY:
      return {
        ...state,
        breadcrumb: "Login & Security",
        EDITING: EDIT_LOGIN_SECURITY,
      };
    default:
      return state;
  }
};

export default editProfileReducer;
