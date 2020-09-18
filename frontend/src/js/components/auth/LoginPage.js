import React, { useRef, useEffect, useState } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  AmazonButton,
  UIForm,
  TermsAndConditions,
  UILinkButton,
} from "../shared";
import { loginAction, verifyAccountAction } from "../../actions/AuthActions";
import FormLayout from "../shared/FormLayout";

const LoginPage = () => {
  const {
    login: { LOGIN_STAGE },
    auth: { isAuthenticated },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({});
  const history = useHistory();
  const inputRef = useRef(null);

  const handleLogin = (data) => {
    switch (LOGIN_STAGE.STEPID) {
      case 1:
        setLoginData({ ...loginData, email: data.email });

        return dispatch(verifyAccountAction(data));
      case 2:
        setLoginData({ ...loginData, password: data.password });
        return dispatch(loginAction({ ...loginData, password: data.password }));
      default:
        return null;
    }
  };

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
  }, []);

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <FormLayout
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
        initialState={LOGIN_STAGE.INITIAL_STATE}
        submitHandler={handleLogin}
        validationSchema={LOGIN_STAGE.VALIDATION}
      >
        <UIForm.Input
          type={LOGIN_STAGE.INPUT.type}
          name={LOGIN_STAGE.INPUT.type}
          label={LOGIN_STAGE.INPUT.label}
          ref={inputRef}
        />

        <UIForm.Button
          button={({ isSubmitting }) => (
            <AmazonButton
              buttonText={LOGIN_STAGE.BUTTON_TEXT}
              dataTestId="login-button"
              type="submit"
              disabled={isSubmitting}
            />
          )}
        />
      </UIForm>
      <TermsAndConditions />
      <Link to="/forgotpassword">
        <UILinkButton content="Forgot password" />
      </Link>
    </FormLayout>
  );
};

export default LoginPage;
