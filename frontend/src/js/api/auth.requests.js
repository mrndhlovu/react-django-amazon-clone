/* eslint-disable no-return-await */
import axios from "axios";
import { PARAMS, AUTH_EP, AUTH_PARAMS, baseURL } from "./urls";

const authAxiosInstance = axios.create({ ...AUTH_PARAMS });
const axiosInstance = axios.create({ ...PARAMS });

export const requestCurrentUser = async () =>
  await authAxiosInstance.get(`${AUTH_EP}/me/`);

export const requestLogin = async (data) =>
  await axiosInstance.post(`${AUTH_EP}/login/`, data);

export const requestLogout = async (body) =>
  await authAxiosInstance.post(`${AUTH_EP}/logout/`, body);

export const requestUpdatePassword = async (data) =>
  await authAxiosInstance.put(`${AUTH_EP}/update-password/`, data);

export const requestRegister = async (data) =>
  await axiosInstance.post(`${AUTH_EP}/register/`, data);

export const requestDeleteAccount = async () =>
  await authAxiosInstance.delete(`${AUTH_EP}/delete-account/`);

export const requestUpdateProfile = async (data) =>
  await authAxiosInstance.put(`${AUTH_EP}/update-user-detail/`, data);

export const requestVerifyUser = async (data) =>
  await axiosInstance.post(`${AUTH_EP}/verify-account/`, data);

export const requestPasswordResetEmailVerification = async (data) =>
  await axiosInstance.post(`${AUTH_EP}/password-reset-email/`, data);

export const requestVerifyOtp = async (data) =>
  await axiosInstance.get(`${baseURL}${data.otp}`, data);

export const requestChangePassword = async (data) =>
  await axiosInstance.patch(`${AUTH_EP}/password-reset-complete/`, data);
