/* eslint-disable no-return-await */
import axios from "axios";
import Cookies from "js-cookie";

import {
  ADDRESS_EP,
  ORDERS_EP,
  PARAMS,
  PRODUCTS_EP,
  AUTH_PARAMS,
} from "../utils/urlUtils";

const authAxiosInstance = axios.create(AUTH_PARAMS);
const axiosInstance = axios.create(PARAMS);

export const requestProductList = (filterParams) =>
  axiosInstance.get(`${PRODUCTS_EP}/${filterParams || ""}`);

export const requestProductDetail = (id) =>
  axiosInstance.get(`${PRODUCTS_EP}/${id}/`);

export const requestCartUpdate = (data) =>
  authAxiosInstance.post(`${ORDERS_EP}/add-to-cart`, data, {
    headers: { Authorization: `Bearer ${Cookies.get("access")}` },
  });

export const requestRemoveFromCart = (data) =>
  authAxiosInstance.post(`${ORDERS_EP}/remove-from-cart`, data, {
    headers: { Authorization: `Bearer ${Cookies.get("access")}` },
  });

export const requestClearCart = () =>
  authAxiosInstance.get(`${ORDERS_EP}/clear-cart`);

export const requestCreateCustomerOrder = () =>
  authAxiosInstance.get(`${ORDERS_EP}/create`, {
    headers: { Authorization: `Bearer ${Cookies.get("access")}` },
  });

export const requestShoppingBasketDetails = () =>
  authAxiosInstance.get(`${ORDERS_EP}/get-shopping-basket`, {
    headers: { Authorization: `Bearer ${Cookies.get("access")}` },
  });

export const requestCompletedOrders = () =>
  authAxiosInstance.get(`${ORDERS_EP}/get-completed-orders`, {
    headers: { Authorization: `Bearer ${Cookies.get("access")}` },
  });

export const requestCustomerProfileUpdate = async (data) =>
  await authAxiosInstance.post(`${ADDRESS_EP}/update-address`, data, {
    headers: { Authorization: `Bearer ${Cookies.get("access")}` },
  });

export const requestPaymentIntent = async () =>
  await authAxiosInstance.get(`${ORDERS_EP}/payment-intent`, {
    headers: { Authorization: `Bearer ${Cookies.get("access")}` },
  });

export const requestCheckoutOrder = async (data) =>
  await authAxiosInstance.post(`${ORDERS_EP}/checkout-order`, data, {
    headers: { Authorization: `Bearer ${Cookies.get("access")}` },
  });
