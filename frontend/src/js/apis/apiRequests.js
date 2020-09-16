import axios from "axios";
import { PARAMS, AUTH_EP, AUTH_PARAMS } from "../utils/urls";

const authAxiosInstance = axios.create({ ...AUTH_PARAMS });
const axiosInstance = axios.create({ ...PARAMS });

export const requestCurrentUser = () => authAxiosInstance.get(`${AUTH_EP}/me/`);
export const requestLogin = (data) =>
  axiosInstance.post(`${AUTH_EP}/login/`, data);

export const requestLogout = (data) =>
  authAxiosInstance.post(`${AUTH_EP}/logout/`, data);

export const requestRegister = (data) =>
  axiosInstance.post(`${AUTH_EP}/register/`, data);

export const requestVerifyUser = (data) =>
  axiosInstance.get(`${AUTH_EP}/verify?email=${data.email}`, data);
