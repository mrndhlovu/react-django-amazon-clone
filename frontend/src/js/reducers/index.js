import { combineReducers } from "redux";

import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import loadingReducer from "./loadingReducer";
import accountRecoveryReducer from "./accountAssistReducer";
import editProfileReducer from "./editProfileReducer";
import cartReducer from "./cartReducer";
import productsReducer from "./productReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  login: loginReducer,
  register: registerReducer,
  spinner: loadingReducer,
  passwordReset: accountRecoveryReducer,
  editProfile: editProfileReducer,
  cart: cartReducer,
  products: productsReducer,
});
