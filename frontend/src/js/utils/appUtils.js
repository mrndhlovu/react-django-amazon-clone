/* eslint-disable no-return-assign */
/* eslint-disable indent */

import { isEmpty, times } from "lodash";

const groupParamsByKey = (params) =>
  [...params.entries()].reduce((acc, tuple) => {
    const [key, val] = tuple;
    if (Array.isArray(key)) {
      if (Array.isArray(acc[key])) {
        acc[key] = [...acc[key], val];
      } else acc[key] = [acc[key], val];
    } else acc[key] = val;
    return acc;
  }, {});

export const getParamString = (string) =>
  string.toLowerCase().split(" ").join("-");

export const getPageId = (location) =>
  location.pathname.split("/").splice(1)[0];

export const getSearchParams = () => {
  const params = window.location.search.slice(1);
  return groupParamsByKey(params.split("="));
};

export const getStars = (value) => {
  const [whole, fraction] = parseFloat(value).toString().split(".");
  const stars = [];
  times(parseInt(whole, 10), () => stars.push("FULL"));
  if (fraction) stars.push("HALF");
  times(5 - value, () => stars.push("NONE"));
  return stars;
};

export const getCartDetails = (items) => {
  return isEmpty(items)
    ? { subTotal: 0, cartCount: 0 }
    : items
        .map((item) => ({
          subTotal: item?.price * item.quantity,
          cartCount: item.quantity,
        }))
        .reduce((accumulator, { subTotal, cartCount = 0 }) => ({
          ...accumulator,
          subTotal: parseFloat(accumulator.subTotal) + parseFloat(subTotal),
          cartCount:
            parseInt(accumulator.cartCount, 10) + parseInt(cartCount, 10),
        }));
};

export const resetForm = (data) => {
  if (Array.isArray(data)) {
    data.forEach((id) => (document.getElementById(id).value = ""));
    return;
  }
  document.getElementById(data).value = "";
};
