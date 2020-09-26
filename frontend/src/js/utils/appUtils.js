/* eslint-disable no-plusplus */

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

  for (let i = 0; i < whole; i += 1) stars.push("FULL");
  if (fraction) stars.push("HALF");
  for (let i = whole; i < (fraction ? 4 : 5); i++) stars.push("NONE");

  return stars;
};
