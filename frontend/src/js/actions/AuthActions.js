import {
  GET_CURRENT_FAIL,
  GET_CURRENT_USER,
  GET_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "./ActionTypes";
import {
  requestCurrentUser,
  requestLogin,
  requestLogout,
  requestRegister,
} from "../apis/apiRequests";
import {
  alertUser,
  makeRequest,
  requestSuccess,
  requestFail,
} from "./action.helpers";

export const getUserInfo = () => {
  return (dispatch) => {
    dispatch(makeRequest(GET_CURRENT_USER));
    requestCurrentUser()
      .then((response) => {
        dispatch(requestSuccess(GET_USER_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(requestFail(GET_CURRENT_FAIL, error?.response));
        dispatch(alertUser("User not found"));
      });
  };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(LOGIN));
    requestLogin(data)
      .then((response) => {
        dispatch(requestSuccess(LOGIN_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(requestFail(LOGIN_ERROR, error?.response));
        dispatch(alertUser("Login fail"));
      });
  };
};

export const logout = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(LOGOUT));
    requestLogout(data)
      .then((response) => {
        dispatch(requestSuccess(LOGOUT_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(requestFail(LOGOUT_ERROR, error?.response));
        dispatch(alertUser("Logout fail"));
      });
  };
};

export const register = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(REGISTER));
    requestRegister(data)
      .then((response) => {
        dispatch(requestSuccess(REGISTER_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(requestFail(REGISTER_ERROR, error?.response));
        dispatch(alertUser("Register fail"));
      });
  };
};
