import { combineReducers } from "redux";

import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import loadingReducer from "./loadingReducer";
import accountRecoveryReducer from "./accountRecoveryReducer";
import editProfileReducer from "./editProfileReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  login: loginReducer,
  register: registerReducer,
  spinner: loadingReducer,
  passwordReset: accountRecoveryReducer,
  editProfile: editProfileReducer,
});
