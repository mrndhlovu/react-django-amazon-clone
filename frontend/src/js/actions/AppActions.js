import { alertUser, removeAlert } from "./action.helpers";

export const clearAlert = () => {
  return (dispatch) => {
    dispatch(removeAlert());
  };
};

export const notify = (data) => {
  return (dispatch) => {
    dispatch(alertUser(data));
  };
};
