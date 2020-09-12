/* eslint-disable no-unused-expressions */
import { isArray } from "lodash";

export const baseURL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000" : "PROD_URL";

export const TASKS_EP = "/v1/api/tasks";
export const AUTH_EP = "/v1/api/auth";

export const PARAMS = {
  baseURL,
  //   headers: { Accept: "application/json", "Content-Type": "application/json" },
  //   credentials: "same-origin",
  //   withCredentials: true,
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

  return params
    ? `${redirect || pathname}?ref=${getParamString(params)}`
    : `${pathname}`;
};
