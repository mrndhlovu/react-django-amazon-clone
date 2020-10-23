import {} from "./ActionTypes";

import { fireAction } from "./action.helpers";

export const editProfileAction = (action) => (dispatch) =>
  dispatch(fireAction(action));
