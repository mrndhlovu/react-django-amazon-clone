import { SHOW_ALERT, REMOVE_ALERT } from "./ActionTypes";

export const makeRequest = (type) => ({ type });

export const requestSuccess = (type, payload) => ({ type, payload });

export const requestFail = (type, payload) => ({ type, payload });

export const alertUser = (data) => {
  return {
    type: SHOW_ALERT,
    payload: data?.message || data?.error || data?.detail,
  };
};

export const removeAlert = () => {
  return {
    type: REMOVE_ALERT,
    payload: {},
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
