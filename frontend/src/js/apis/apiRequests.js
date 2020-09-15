/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */

import axios from "axios";
import { PARAMS, AUTH_EP } from "../utils/urls";

const axiosInstance = axios.create({ ...PARAMS });

export const requestPlaceholderData = (url) => axiosInstance.get(url);
export const requestCurrentUser = () =>
  axiosInstance.get(`${AUTH_EP}/overview/`);
