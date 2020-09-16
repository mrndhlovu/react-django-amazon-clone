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
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  VERIFY_EMAIL,
} from "./ActionTypes";
import {
  requestCurrentUser,
  requestLogin,
  requestLogout,
  requestRegister,
  requestVerifyUser,
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
        localStorage.removeItem("accessToken");
        dispatch(requestFail(GET_CURRENT_FAIL, error?.response.data));
        dispatch(alertUser("User not found"));
      });
  };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(LOGIN));
    requestLogin(data)
      .then((response) => {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        dispatch(requestSuccess(LOGIN_SUCCESS, response?.data));
        dispatch(requestSuccess(GET_USER_SUCCESS, response?.data));
      })
      .catch((error) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(requestFail(LOGIN_ERROR, error?.response.data));
        dispatch(alertUser("Login fail"));
      });
  };
};

export const logout = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(LOGOUT));
    requestLogout(data)
      .then((response) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(requestSuccess(LOGOUT_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(requestFail(LOGOUT_ERROR, error?.response));
        dispatch(alertUser("Logout fail"));
      });
  };
};

export const verify = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(VERIFY_EMAIL));
    requestVerifyUser(data)
      .then((response) => {
        dispatch(requestSuccess(VERIFY_EMAIL_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(requestFail(VERIFY_EMAIL_ERROR, error?.response));
        dispatch(alertUser("Logout fail"));
      });
  };
};

export const register = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(REGISTER));
    requestRegister(data)
      .then((response) => {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        dispatch(requestSuccess(REGISTER_SUCCESS, response?.data));
      })
      .catch((error) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(requestFail(REGISTER_ERROR, error?.response));
        dispatch(alertUser("Register fail"));
      });
  };
};
