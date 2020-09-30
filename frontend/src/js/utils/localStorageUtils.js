export const VIEWED_RECENT =
  JSON.parse(localStorage.getItem("VIEWED_RECENT")) ||
  localStorage.setItem("VIEWED_RECENT", JSON.stringify([]));
