/* eslint-disable no-unused-expressions */
import { isArray } from "lodash";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://amazon-clone.ndhlovu.com"
    : "http://localhost:8000";

export const AUTH_EP = "/v1/api/auth";
export const PRODUCTS_EP = "/v1/api/products";
export const ORDERS_EP = "/v1/api/orders";
export const ADDRESS_EP = "/v1/api/address";

export const AUTH_PARAMS = {
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credentials: "include",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
};

export const PARAMS = {
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const getParamString = (strings) => {
  let result;

  isArray(strings)
    ? (result = strings.join("-").toLowerCase().split(" ").join("-"))
    : `${strings.split(" ").join("-")}`;

  return result.toLowerCase();
};

export const getQueryParam = (history, redirect, params) => {
  const { pathname } = history.location;

  return params ? `?ref=${getParamString(params)}` : `${pathname}`;
};

export const parseParams = (search) =>
  JSON.parse(
    '{"' + decodeURI(search.replace(/&/g, '","').replace(/=/g, '":"')) + '"}'
  );

export const updateUrlParams = (newParams) => {
  const newurl = `${window.location.protocol}//${window.location.host}${
    window.location.pathname
  }${newParams ? `${newParams}` : ""}`;
  return window.history.pushState({ path: newurl }, "", newurl);
};
