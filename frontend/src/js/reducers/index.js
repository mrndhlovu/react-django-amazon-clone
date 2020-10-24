import { combineReducers } from "redux";

import auth from "./authReducer";
import alert from "./alertReducer";
import login from "./loginReducer";
import register from "./registerReducer";
import passwordReset from "./accountAssistReducer";
import editProfile from "./editProfileReducer";
import cart from "./cartReducer";
import products from "./productReducer";
import checkout from "./checkoutReducer";

export default combineReducers({
  auth,
  alert,
  login,
  register,
  passwordReset,
  editProfile,
  cart,
  products,
  checkout,
});
