import {
  AUTH_USER_ERROR,
  AUTH_USER,
  AUTH_USER_SUCCESS,
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
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  UPDATE_PASSWORD,
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_ERROR,
  VERIFY_ACCOUNT,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_ERROR,
  RESET_FLOW,
} from "./ActionTypes";
import {
  requestCurrentUser,
  requestLogin,
  requestLogout,
  requestVerifyOtp,
  requestRegister,
  requestVerifyUser,
  requestChangePassword,
  requestPasswordRestEmailVerification,
} from "../apis/apiRequests";
import {
  alertUser,
  makeRequest,
  requestSuccess,
  requestFail,
  updateLocalStorage,
} from "./action.helpers";

export const getUserInfo = () => {
  return (dispatch) => {
    dispatch(makeRequest(AUTH_USER));
    requestCurrentUser()
      .then((response) => {
        dispatch(requestSuccess(AUTH_USER_SUCCESS, response?.data));
      })
      .catch(() => {
        updateLocalStorage();
        dispatch(requestFail(AUTH_USER_ERROR));
      });
  };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(LOGIN));
    requestLogin(data)
      .then((response) => {
        updateLocalStorage({
          access: response.data.access,
          refresh: response.data.refresh,
        });
        dispatch(requestSuccess(LOGIN_SUCCESS, response?.data?.user));
        dispatch(requestSuccess(AUTH_USER_SUCCESS, response?.data.user));
      })
      .catch((error) => {
        updateLocalStorage();
        dispatch(requestFail(LOGIN_ERROR));
        dispatch(alertUser(error?.response?.data));
      });
  };
};

export const logout = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(LOGOUT));
    requestLogout(data)
      .then(() => {
        updateLocalStorage();
        dispatch(requestSuccess(LOGOUT_SUCCESS));
      })
      .catch((error) => {
        dispatch(requestFail(LOGOUT_ERROR));
        dispatch(alertUser(error?.response?.data));
      });
  };
};

export const verify = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(VERIFY_ACCOUNT));
    requestVerifyUser(data)
      .then((response) => {
        dispatch(requestSuccess(VERIFY_ACCOUNT_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(requestFail(VERIFY_ACCOUNT_ERROR));
        dispatch(alertUser(error?.response?.data));
      });
  };
};

export const passwordResetVerifyEmail = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(VERIFY_EMAIL));
    requestPasswordRestEmailVerification(data)
      .then((response) => {
        dispatch(requestSuccess(VERIFY_EMAIL_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(requestFail(VERIFY_EMAIL_ERROR));
        dispatch(alertUser(error?.response?.data));
      });
  };
};

export const resetChangePasswordFlow = () => {
  return (dispatch) => {
    dispatch(makeRequest(RESET_FLOW));
  };
};

export const updatePassword = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(UPDATE_PASSWORD));
    requestChangePassword(data)
      .then((response) => {
        updateLocalStorage({
          access: response.data.access,
          refresh: response.data.refresh,
        });
        dispatch(requestSuccess(UPDATE_PASSWORD_SUCCESS));
        dispatch(alertUser(response?.data));
      })
      .catch((error) => {
        dispatch(requestFail(UPDATE_PASSWORD_ERROR));
        dispatch(alertUser(error?.response?.data));
      });
  };
};

export const verifyOtp = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(VERIFY_OTP));
    requestVerifyOtp(data)
      .then((response) => {
        dispatch(requestSuccess(VERIFY_OTP_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(requestFail(VERIFY_OTP_ERROR));
        dispatch(alertUser(error?.response?.data));
      });
  };
};

export const register = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(REGISTER));
    requestRegister(data)
      .then((response) => {
        updateLocalStorage({
          access: response.data.access,
          refresh: response.data.refresh,
        });
        dispatch(requestSuccess(REGISTER_SUCCESS, response?.data.user));
        dispatch(requestSuccess(AUTH_USER_SUCCESS, response?.data.user));
      })
      .catch((error) => {
        updateLocalStorage();
        dispatch(requestFail(REGISTER_ERROR));
        dispatch(alertUser(error?.response?.data));
      });
  };
};
