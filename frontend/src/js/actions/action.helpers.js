import { SHOW_ALERT, REMOVE_ALERT } from "./ActionTypes";

export const makeRequest = (type) => ({ type });

export const requestSuccess = (type, payload) => ({ type, payload });

export const requestFail = (type, payload) => ({ type, payload });

export const alertUser = (successMessage, errorMessage) => {
  return {
    type: successMessage ? SHOW_ALERT : REMOVE_ALERT,
    payload: successMessage
      ? { message: successMessage }
      : { error: errorMessage },
  };
};

export const updateLocalStorage = (data) => {
  if (data) {
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};
