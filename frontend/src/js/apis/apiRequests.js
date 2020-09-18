import axios from "axios";
import {
  PARAMS, AUTH_EP, AUTH_PARAMS, baseURL,
} from "../utils/urls";

const authAxiosInstance = axios.create({ ...AUTH_PARAMS });
const axiosInstance = axios.create({ ...PARAMS });

export const requestCurrentUser = () => authAxiosInstance.get(`${AUTH_EP}/me/`);
export const requestLogin = (data) =>
  axiosInstance.post(`${AUTH_EP}/login/`, data);

export const requestLogout = () => authAxiosInstance.get(`${AUTH_EP}/logout/`);
export const requestUpdatePassword = (data) =>
  authAxiosInstance.post(`${AUTH_EP}/update-password/`, data);

export const requestRegister = (data) =>
  axiosInstance.post(`${AUTH_EP}/register/`, data);

export const requestDeleteAccount = () =>
  authAxiosInstance.delete(`${AUTH_EP}/delete-account/`);

export const requestUpdateProfile = (data) =>
  authAxiosInstance.post(`${AUTH_EP}/update-user-detail/`, data);

export const requestVerifyUser = (data) =>
  axiosInstance.post(`${AUTH_EP}/verify-account/`, data);

export const requestPasswordRestEmailVerification = (data) =>
  axiosInstance.post(`${AUTH_EP}/password-reset-email/`, data);

export const requestVerifyOtp = (data) =>
  axiosInstance.get(`${baseURL}${data.otp}`, data);

export const requestChangePassword = (data) =>
  axiosInstance.patch(`${AUTH_EP}/password-reset-complete/`, data);
