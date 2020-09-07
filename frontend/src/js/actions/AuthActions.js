/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */

import { INITIALIZE_AUTH } from "./ActionTypes";
import { requestPlaceholderData } from "../apis/apiRequests";
import { createMessage, makeRequest } from "./index";

export const getAuth = () => (dispatch) => {
  dispatch(makeRequest(INITIALIZE_AUTH));
  requestPlaceholderData()
    .then(() => dispatch(createMessage({ successMsg: "request successful" })))
    .catch(() => dispatch(createMessage({ errorMsg: "request fail" })));
};
