export const VIEWED_RECENT =
  JSON.parse(localStorage.getItem("VIEWED_RECENT")) ||
  localStorage.setItem("VIEWED_RECENT", JSON.stringify([]));

export const SHOPPING_CART =
  JSON.parse(localStorage.getItem("SHOPPING_CART")) ||
  localStorage.setItem("SHOPPING_CART", JSON.stringify([]));
