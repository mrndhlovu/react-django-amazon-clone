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
  requestPasswordResetEmailVerification,
} from "../apis/apiRequests";
import {
  fireAction,
  fireActionWithAlert,
  updateLocalStorage,
  showAlertAction,
} from "./action.helpers";

export const getUserAction = () => {
  return (dispatch) => {
    dispatch(fireAction(AUTH_USER));
    requestCurrentUser()
      .then((response) => {
        dispatch(fireAction(AUTH_USER_SUCCESS, response?.data));
      })
      .catch(() => {
        updateLocalStorage();
        dispatch(fireAction(AUTH_USER_ERROR));
      });
  };
};

export const loginAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(LOGIN));
    requestLogin(data)
      .then((response) => {
        updateLocalStorage({
          access: response.data.access,
          refresh: response.data.refresh,
        });
        dispatch(fireAction(LOGIN_SUCCESS));
        dispatch(fireAction(AUTH_USER_SUCCESS, response?.data.user));
      })
      .catch((error) => {
        updateLocalStorage();
        dispatch(fireActionWithAlert(LOGIN_ERROR, error?.response?.data));
      });
  };
};

export const logoutAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(LOGOUT));
    requestLogout(data)
      .then(() => {
        updateLocalStorage();
        dispatch(fireAction(LOGOUT_SUCCESS));
      })
      .catch((error) => {
        dispatch(fireActionWithAlert(LOGOUT_ERROR, error?.response?.data));
      });
  };
};

export const verifyAccountAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(VERIFY_ACCOUNT));
    requestVerifyUser(data)
      .then((response) => {
        dispatch(fireAction(VERIFY_ACCOUNT_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(
          fireActionWithAlert(VERIFY_ACCOUNT_ERROR, error?.response?.data)
        );
      });
  };
};

export const passwordResetVerifyEmail = (data) => {
  return (dispatch) => {
    dispatch(fireAction(VERIFY_EMAIL));
    requestPasswordResetEmailVerification(data)
      .then((response) => {
        dispatch(fireAction(VERIFY_EMAIL_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(
          fireActionWithAlert(VERIFY_EMAIL_ERROR, error?.response?.data)
        );
      });
  };
};

export const resetChangePasswordFlow = () => {
  return (dispatch) => {
    dispatch(fireAction(RESET_FLOW));
  };
};

export const updatePasswordAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(UPDATE_PASSWORD));
    requestChangePassword(data)
      .then((response) => {
        updateLocalStorage({
          access: response.data.access,
          refresh: response.data.refresh,
        });
        dispatch(fireAction(UPDATE_PASSWORD_SUCCESS));
        dispatch(showAlertAction(response?.data));
      })
      .catch((error) => {
        dispatch(
          fireActionWithAlert(UPDATE_PASSWORD_ERROR, error?.response?.data)
        );
      });
  };
};

export const verifyOtpAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(VERIFY_OTP));
    requestVerifyOtp(data)
      .then((response) => {
        dispatch(fireAction(VERIFY_OTP_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(fireActionWithAlert(VERIFY_OTP_ERROR, error?.response?.data));
      });
  };
};

export const registerAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(REGISTER));
    requestRegister(data)
      .then((response) => {
        updateLocalStorage({
          access: response.data.access,
          refresh: response.data.refresh,
        });
        dispatch(fireAction(REGISTER_SUCCESS, response?.data.user));
        dispatch(fireAction(AUTH_USER_SUCCESS, response?.data.user));
      })
      .catch((error) => {
        updateLocalStorage();
        dispatch(fireActionWithAlert(REGISTER_ERROR, error?.response?.data));
      });
  };
};
