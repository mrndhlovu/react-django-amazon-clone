import axios from "axios";
import { PARAMS, AUTH_EP, AUTH_PARAMS } from "../utils/urls";

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

export const requestVerifyUser = (data) => {
  const queryParams = data?.sendOtp
    ? `?email=${data.email}&recovery='true'`
    : `?email=${data.email}`;
  return axiosInstance.get(`${AUTH_EP}/verify${queryParams}`, data);
};

export const requestVerifyOtp = (data) =>
  axiosInstance.post(`${AUTH_EP}/recovery-verify-otp/`, data);

export const requestRecoveryChangePassword = (data) =>
  axiosInstance.put(`${AUTH_EP}/recovery-new-password/`, data);
