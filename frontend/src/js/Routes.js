"use es6";

import React from "react";
import { Route, Switch } from "react-router-dom";

import HomeContainer from "./containers/HomeContainer";
import LoginPage from "./components/auth/LoginPage";

export default function Routes() {
  return (
    <Switch>
      <Route key="/" exact path="/" component={HomeContainer} />
      <Route key="login" path="/login" component={LoginPage} />
    </Switch>
  );
}
