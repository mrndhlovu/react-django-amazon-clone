import React from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import AmazonLogo from "../header/AmazonLogo";
import { AmazonButton, UIForm, TermAndConditions } from "../shared";

const LOGIN_INITIAL_STATE = {
  email: undefined,
  password: undefined,
};

const VALIDATION_SCHEMA = yup.object({
  email: yup.string().required(),
  password: yup.string().required().min(8),
});

const LoginPage = () => {
  const history = useHistory();

  const handleLogin = () => {};

  return (
    <div data-testid="login-page-container">
      <AmazonLogo dataTestId="login-page-logo" />
      <UIForm
        dataTestId="login-form"
        initialState={LOGIN_INITIAL_STATE}
        submitHandler={handleLogin}
        validationSchema={VALIDATION_SCHEMA}
      >
        <UIForm.Input
          type="email"
          name="email"
          label="E-mail (phone for mobile accounts)"
        />
        <UIForm.Input type="password" name="password" label="Password" />
        <UIForm.Button
          button={({ isSubmitting }) => (
            <AmazonButton
              buttonText="Continue"
              dataTestId="login-button"
              handleClick={() => {}}
              type="submit"
              disabled={isSubmitting}
            />
          )}
        />
        <TermAndConditions />
      </UIForm>
      <UIForm.Button
        button={() => (
          <AmazonButton
            buttonText="Create your Amazon account"
            dataTestId="signup-button"
            handleClick={() => history.push("/register")}
            type="submit"
            secondary
          />
        )}
      />
    </div>
  );
};

export default LoginPage;
