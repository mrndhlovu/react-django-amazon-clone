/* eslint-disable no-return-await */
import axios from "axios";
import {
  PARAMS,
  PRODUCTS_EP,
  ORDERS_EP,
  AUTH_PARAMS,
  ADDRESS_EP,
} from "../utils/urlUtils";

const authAxiosInstance = axios.create({ ...AUTH_PARAMS });
const axiosInstance = axios.create({ ...PARAMS });

export const requestProductList = (filterParams) =>
  axiosInstance.get(`${PRODUCTS_EP}/${filterParams || ""}`);

export const requestProductDetail = (id) =>
  axiosInstance.get(`${PRODUCTS_EP}/${id}/`);

export const requestCartUpdate = (data) =>
  authAxiosInstance.post(`${ORDERS_EP}/add-to-cart`, data);

export const requestRemoveFromCart = (data) =>
  authAxiosInstance.post(`${ORDERS_EP}/remove-from-cart`, data);

export const requestClearCart = () =>
  authAxiosInstance.get(`${ORDERS_EP}/clear-cart`);

export const requestCreateCustomerOrder = () =>
  authAxiosInstance.get(`${ORDERS_EP}/create`);

export const requestShoppingBasketDetails = (data) =>
  authAxiosInstance.get(`${ORDERS_EP}/get-shopping-basket`, data);

export const requestCustomerProfileUpdate = async (data) =>
  await authAxiosInstance.post(`${ADDRESS_EP}/update-address`, data);

export const requestPaymentIntent = async (data) =>
  await authAxiosInstance.get(`${ORDERS_EP}/payment-intent`, data);

export const requestCheckoutOrder = async (data) =>
  await authAxiosInstance.post(`${ORDERS_EP}/checkout-order`, data);
