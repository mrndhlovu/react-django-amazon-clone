import React from "react";
import { Route, Switch } from "react-router-dom";

import HomeContainer from "./containers/HomeContainer";
import LoginPage from "./components/auth/LoginPage";
import PasswordAssistance from "./components/auth/PasswordAssistance";
import Register from "./components/auth/Register";
import YourAccount from "./components/auth/YourAccount";
import ProductList from "./components/product/ProductList.js";
import ProductDetail from "./components/product/ProductDetail";
import ShoppingBasket from "./components/product/ShoppingBasket";
import Checkout from "./components/checkout/Checkout";

export default function Routes() {
  return (
    <Switch>
      <Route key="/" exact path="/" component={HomeContainer} />
      <Route key="login" path="/login" component={LoginPage} />
      <Route key="register" path="/register" component={Register} />
      <Route key="account" path="/user-profile" component={YourAccount} />
      <Route
        key="product-detail"
        path="/product-detail/:id"
        component={ProductDetail}
      />

      <Route key="checkout" path="/checkout" component={Checkout} />

      <Route
        key="shopping-basket"
        path="/shopping-basket"
        component={ShoppingBasket}
      />
      <Route key="product-list" path="/product-list" component={ProductList} />
      <Route
        key="forgotpassword"
        path="/forgotpassword"
        component={PasswordAssistance}
      />
    </Switch>
  );
}
