import { combineReducers } from "redux";

import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import loginReducer from "./loginReducer";
import verifyUserEmailReducer from "./verifyUserEmailReducer";

export default combineReducers({
  user: authReducer,
  alert: alertReducer,
  login: loginReducer,
  verify: verifyUserEmailReducer,
});
