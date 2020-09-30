/* eslint-disable no-return-await */
import axios from "axios";
import { PARAMS, PRODUCTS_EP } from "../utils/urlUtils";

// const authAxiosInstance = axios.create({ ...AUTH_PARAMS });
const axiosInstance = axios.create({ ...PARAMS });

export const requestProductList = (filterParams) =>
  axiosInstance.get(`${PRODUCTS_EP}/${filterParams || ""}`);

export const requestProductDetail = (id) =>
  axiosInstance.get(`${PRODUCTS_EP}/${id}/`);
