/* eslint-disable no-unused-expressions */
import { isArray } from "lodash";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://db-amazon-clone.ndhlovu.com/v1/api"
    : "http://localhost:8000/v1/api";

export const AUTH_EP = "/auth";
export const PRODUCTS_EP = "/products";
export const ORDERS_EP = "/orders";
export const ADDRESS_EP = "/address";

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
