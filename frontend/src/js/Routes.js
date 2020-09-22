import React from "react";
import { Route, Switch } from "react-router-dom";

import HomeContainer from "./containers/HomeContainer";
import LoginPage from "./components/auth/LoginPage";
import PasswordAssistance from "./components/auth/PasswordAssistance";
import Register from "./components/auth/Register";
import YourAccount from "./components/auth/YourAccount";

export default function Routes() {
  return (
    <Switch>
      <Route key="/" exact path="/" component={HomeContainer} />
      <Route key="login" path="/login" component={LoginPage} />
      <Route key="register" path="/register" component={Register} />
      <Route key="account" path="/user-profile" component={YourAccount} />
      <Route
        key="forgotpassword"
        path="/forgotpassword"
        component={PasswordAssistance}
      />
    </Switch>
  );
}
