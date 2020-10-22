import {
  SHOW_ALERT,
  REMOVE_ALERT,
  FETCH_DATA,
  FETCH_DATA_END,
} from "./ActionTypes";

export const fireAction = (type, payload) => ({ type, payload });

export const showAlertAction = (data) => ({
  type: SHOW_ALERT,
  payload: data?.message || data?.error || data?.detail || data,
});

export const removeAlertAction = () => ({
  type: REMOVE_ALERT,
  payload: {},
});

export const fireActionWithAlert = (type, payload) => (dispatch) => {
  dispatch(showAlertAction(payload));

  return dispatch(fireAction(type, payload));
};

export const showSpinner = () => (dispatch) => dispatch(fireAction(FETCH_DATA));

export const removeSpinner = () => (dispatch) =>
  dispatch(fireAction(FETCH_DATA_END));
