/* eslint-disable no-unused-expressions */
import { isArray } from "lodash";
import localStorage from "../utils/localstorage.service";

export const baseURL = "http://localhost:8000";

export const AUTH_EP = "/v1/api/auth";
export const AUTH_PARAMS = {
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getAccessToken()}`,
  },
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

  return params
    ? `${redirect || pathname}?ref=${getParamString(params)}`
    : `${pathname}`;
};
