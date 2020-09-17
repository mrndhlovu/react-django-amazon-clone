import {
  GET_USER_ERROR,
  GET_USER,
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
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  UPDATE_PASSWORD,
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_ERROR,
} from "./ActionTypes";
import {
  requestCurrentUser,
  requestLogin,
  requestLogout,
  requestVerifyOtp,
  requestRegister,
  requestVerifyUser,
  requestRecoveryChangePassword,
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
    dispatch(makeRequest(GET_USER));
    requestCurrentUser()
      .then((response) => {
        dispatch(requestSuccess(GET_USER_SUCCESS, response?.data));
      })
      .catch((error) => {
        updateLocalStorage();
        dispatch(requestFail(GET_USER_ERROR));
        dispatch(alertUser(error?.response?.data?.messages[0].message));
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
        dispatch(requestSuccess(GET_USER_SUCCESS, response?.data.user));
      })
      .catch((error) => {
        updateLocalStorage();
        dispatch(requestFail(LOGIN_ERROR, error?.response?.data));
        dispatch(alertUser("Login fail"));
      });
  };
};

export const logout = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(LOGOUT));
    requestLogout(data)
      .then(() => {
        updateLocalStorage();
        dispatch(requestSuccess(LOGOUT_SUCCESS, {}));
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
        dispatch(requestFail(VERIFY_EMAIL_ERROR, error?.response?.data));
        dispatch(alertUser(error?.response?.data.message));
      });
  };
};

export const updatePassword = (data) => {
  return (dispatch) => {
    dispatch(makeRequest(UPDATE_PASSWORD));
    requestRecoveryChangePassword(data)
      .then((response) => {
        updateLocalStorage({
          access: response.data.access,
          refresh: response.data.refresh,
        });
        dispatch(requestSuccess(UPDATE_PASSWORD_SUCCESS, response?.data));
        dispatch(requestSuccess(GET_USER_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(requestFail(UPDATE_PASSWORD_ERROR, error?.response?.data));
        dispatch(alertUser(error?.response?.data.message));
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
        dispatch(requestFail(VERIFY_OTP_ERROR, error?.response?.data));
        dispatch(alertUser(error?.response?.data.message));
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
        dispatch(requestSuccess(GET_USER_SUCCESS, response?.data.user));
      })
      .catch((error) => {
        updateLocalStorage();
        dispatch(
          requestFail(REGISTER_ERROR, {
            message: Object.values(error?.response?.data)[0],
          }),
        );
      });
  };
};
