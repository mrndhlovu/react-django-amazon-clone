import React from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import "./_loginPage.scss";

import AmazonLogo from "../header/AmazonLogo";
import { AmazonButton, UIForm, TermAndConditions } from "../shared";
import TextDivider from "../shared/TextDivider";

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
    <div data-testid="login-page-container" className="login__page__container">
      <div className="form__container">
        <AmazonLogo
          dataTestId="login-page-logo"
          height="60"
          width="100"
          fill="#000"
        />

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

          <div className="auth__divider__account">
            <TextDivider text="New to Amazon" />
            <UIForm.Button
              button={() => (
                <AmazonButton
                  buttonText="Create your Amazon account"
                  dataTestId="signup-button"
                  handleClick={() => history.push("/register")}
                  secondary
                />
              )}
            />
          </div>
        </UIForm>
      </div>
    </div>
  );
};

export default LoginPage;
