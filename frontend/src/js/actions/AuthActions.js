/* eslint-disable camelcase */
import Cookies from "js-cookie";

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
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
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
  requestRefreshToken,
} from "../api/auth.requests";
import { requestCustomerProfileUpdate } from "../api/product.requests";

import { fireAction, fireActionWithAlert } from "./action.helpers";

export const getRefreshTokenAction = () => {
  return (dispatch) => {
    dispatch(fireAction(REFRESH_TOKEN));
    requestRefreshToken()
      .then((response) => {
        Cookies.remove("access");

        const accessToken = response.data?.access;
        Cookies.set("access", accessToken);
        dispatch(fireAction(REFRESH_TOKEN_SUCCESS));
      })
      .catch(() => {
        dispatch(fireAction(REFRESH_TOKEN_ERROR));
      });
  };
};

export const getUserAction = () => {
  return (dispatch) => {
    dispatch(fireAction(AUTH_USER));
    requestCurrentUser()
      .then((response) => {
        dispatch(fireAction(AUTH_USER_SUCCESS, response?.data));
      })
      .catch((error) => {
        if (error?.response?.data.code === "token_not_valid") {
          return dispatch(getRefreshTokenAction());
        }
        dispatch(fireAction(AUTH_USER_ERROR));
      });
  };
};

export const loginAction = (data, callback) => {
  return (dispatch) => {
    dispatch(fireAction(LOGIN));
    requestLogin(data)
      .then((response) => {
        const { access, refresh } = response.data.tokens;

        Cookies.set("access", access);
        Cookies.set("refresh", refresh);

        if (callback) callback();

        dispatch(fireAction(LOGIN_SUCCESS));
        dispatch(fireAction(AUTH_USER_SUCCESS, response?.data.user));
      })
      .catch((error) => {
        if (error?.response?.data.code === "token_not_valid") {
          Cookies.remove("access");
          return dispatch(getRefreshTokenAction());
        }

        dispatch(fireActionWithAlert(LOGIN_ERROR, error?.response?.data));
        if (callback) callback(error?.response?.data);
      });
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    dispatch(fireAction(LOGOUT));
    requestLogout()
      .then(() => {
        Cookies.remove("refresh");
        Cookies.remove("access");
        dispatch(fireAction(LOGOUT_SUCCESS));
      })
      .catch((error) => {
        Cookies.remove("refresh");
        Cookies.remove("access");
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
