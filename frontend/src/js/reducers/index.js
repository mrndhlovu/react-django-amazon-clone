import { combineReducers } from "redux";

import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
  user: authReducer,
  alert: alertReducer,
  login: loginReducer,
});
