import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AmazonButton, UIForm, TermsAndConditions } from "../shared";
import { LOGIN_STAGES } from "../../constants/constants";
import FormContainer from "./FormContainer";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({});
  const history = useHistory();
  let inputRef = useRef(null);

  const [STAGE, setSTAGE] = useState(LOGIN_STAGES.EMAIL);

  const handleLogin = (data) => {
    switch (STAGE.STEP) {
      case 1:
        setLoginData({ ...loginData, email: data.email });
        return setSTAGE(LOGIN_STAGES.PASSWORD);

      case 2:
        setLoginData({ ...loginData, password: data.password });

        return null;

      default:
        return null;
    }
  };

  useEffect(() => {
    inputRef.current.focus();

    return () => {
      inputRef = null;
    };
  }, []);

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
        initialState={STAGE.INITIAL_STATE}
        submitHandler={handleLogin}
        validationSchema={STAGE.VALIDATION}
      >
        <UIForm.Input
          type={STAGE.INPUT.type}
          name={STAGE.INPUT.type}
          label={STAGE.INPUT.label}
          ref={inputRef}
        />

        <UIForm.Button
          button={({ isSubmitting }) => (
            <AmazonButton
              buttonText={STAGE.BUTTON.content}
              dataTestId="login-button"
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
