/* eslint-disable import/prefer-default-export */

import { APP_STARTED } from "./ActionTypes";

export const startApp = () => (dispatch) => dispatch({ type: APP_STARTED });
