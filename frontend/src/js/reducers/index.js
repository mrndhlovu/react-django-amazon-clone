import { combineReducers } from "redux";

import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import accountRecoveryReducer from "./accountRecoveryReducer";

export default combineReducers({
  user: authReducer,
  alert: alertReducer,
  login: loginReducer,
  register: registerReducer,
  recoverUser: accountRecoveryReducer,
});
