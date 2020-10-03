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
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  OPEN_YOUR_ACCOUNT,
  UPDATE_ADDRESS,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_ERROR,
} from "./ActionTypes";
import {
  requestCurrentUser,
  requestLogin,
  requestLogout,
  requestVerifyOtp,
  requestRegister,
  requestVerifyUser,
  requestChangePassword,
  requestUpdateProfile,
  requestPasswordResetEmailVerification,
  requestUpdatePassword,
} from "../api/auth.requests";
import { requestCustomerProfileUpdate } from "../api/product.requests";

import { fireAction, fireActionWithAlert } from "./action.helpers";
import storageService from "../utils/localstorage.service";

export const getUserAction = () => {
  return (dispatch) => {
    dispatch(fireAction(AUTH_USER));
    requestCurrentUser()
      .then((response) => {
        dispatch(fireAction(AUTH_USER_SUCCESS, response?.data));
      })
      .catch(() => {
        storageService.clearToken();
        dispatch(fireAction(AUTH_USER_ERROR));
      });
  };
};

export const loginAction = (data, callback) => {
  return (dispatch) => {
    dispatch(fireAction(LOGIN));
    requestLogin(data)
      .then((response) => {
        if (callback) callback();
        storageService.setToken(response.data?.tokens);
        dispatch(fireAction(LOGIN_SUCCESS));
        dispatch(fireAction(AUTH_USER_SUCCESS, response?.data.user));
      })
      .catch((error) => {
        storageService.clearToken();
        dispatch(fireActionWithAlert(LOGIN_ERROR, error?.response?.data));
        if (callback) callback(error?.response?.data);
      });
  };
};

export const logoutAction = () => {
  const refreshToken = { refresh: storageService.getRefreshToken() };

  return (dispatch) => {
    dispatch(fireAction(LOGOUT));
    requestLogout(refreshToken)
      .then(() => {
        storageService.clearToken();
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

export const updatePasswordAction = (data, update) => {
  return (dispatch) => {
    dispatch(fireAction(UPDATE_PASSWORD));
    (update ? requestUpdatePassword : requestChangePassword)(data)
      .then(() => {
        dispatch(fireAction(UPDATE_PASSWORD_SUCCESS));
        if (update) {
          dispatch(logoutAction());
          setTimeout(() => {
            dispatch(fireAction(OPEN_YOUR_ACCOUNT));
          }, 1500);
        }
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
        storageService.setToken(response.data?.tokens);
        dispatch(fireAction(REGISTER_SUCCESS));
        return response;
      })
      .then((response) => {
        dispatch(fireAction(AUTH_USER_SUCCESS, response?.data.user));
      })
      .catch((error) => {
        dispatch(fireActionWithAlert(REGISTER_ERROR, error?.response?.data));
      });
  };
};

export const updateUserAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(UPDATE_PROFILE));
    requestUpdateProfile(data)
      .then((response) => {
        dispatch(fireAction(UPDATE_PROFILE_SUCCESS));
        dispatch(fireAction(AUTH_USER_SUCCESS, response?.data.user));
      })
      .catch((error) => {
        dispatch(
          fireActionWithAlert(UPDATE_PROFILE_ERROR, error?.response?.data)
        );
      });
  };
};

export const updateAddressAction = (data) => {
  return (dispatch) => {
    dispatch(fireAction(UPDATE_ADDRESS));
    requestCustomerProfileUpdate(data)
      .then((response) => {
        dispatch(fireAction(UPDATE_ADDRESS_SUCCESS));
        dispatch(fireAction(AUTH_USER_SUCCESS, response?.data));
      })
      .catch((error) => {
        dispatch(
          fireActionWithAlert(UPDATE_ADDRESS_ERROR, error?.response?.data)
        );
      });
  };
};
