import axios from "axios";
import { PARAMS, AUTH_EP } from "../utils/urls";

const axiosInstance = axios.create({ ...PARAMS });

export const requestCurrentUser = () => axiosInstance.get(`${AUTH_EP}/me/`);
export const requestLogin = (data) =>
  axiosInstance.get(`${AUTH_EP}/login/`, data);

export const requestLogout = (data) =>
  axiosInstance.get(`${AUTH_EP}/logout/`, data);

export const requestRegister = (data) =>
  axiosInstance.get(`${AUTH_EP}/register/`, data);
