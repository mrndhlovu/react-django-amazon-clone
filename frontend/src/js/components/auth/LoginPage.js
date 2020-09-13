import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

import { AmazonButton, UIForm, TermsAndConditions } from "../shared";
import FormContainer from "./FormContainer";
import { FORM_VALIDATION } from "../../constants/constants";

const LOGIN_INITIAL_STATE = {
  email: undefined,
  password: undefined,
};

const LoginPage = () => {
  const history = useHistory();
  const emailInputRef = useRef();

  const handleLogin = () => {};

  return (
    <FormContainer
      dataTestId="login-page-container"
      header="Sign-In"
      dividerContent="New to Amazon"
      footerButtonProps={{
        content: "Creat your Amazon account",
        testId: "login-auth-button",
        onClick: () => history.push("/register"),
      }}
    >
      <UIForm
        dataTestId="login-form"
        initialState={LOGIN_INITIAL_STATE}
        submitHandler={handleLogin}
        validationSchema={FORM_VALIDATION.LOGIN}
      >
        <UIForm.Input
          type="email"
          name="email"
          label="E-mail (phone for mobile accounts)"
          ref={emailInputRef}
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
      </UIForm>
      <TermsAndConditions />
    </FormContainer>
  );
};

export default LoginPage;
