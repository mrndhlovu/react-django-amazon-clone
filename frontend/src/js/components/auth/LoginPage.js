import React, { useRef, useEffect, useState, memo } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { UIForm, TermsAndConditions, UILinkButton } from "../shared";
import { loginAction, verifyAccountAction } from "../../actions/AuthActions";
import FormLayout from "../shared/FormLayout";

const LoginPage = () => {
  const history = useHistory();

  const {
    login: { LOGIN_STAGE },
    auth: { isAuthenticated },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({});
  const inputRef = useRef(null);

  const handleLogin = (data, cb) => {
    switch (LOGIN_STAGE.STEPID) {
      case "EMAIL":
        setLoginData({ ...loginData, email: data.email });

        return dispatch(verifyAccountAction(data, cb));
      case "PASSWORD":
        setLoginData({ ...loginData, password: data.password });
        return dispatch(
          loginAction({ ...loginData, password: data.password }, cb)
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
    if (isAuthenticated) return history.goBack();
  }, [isAuthenticated, inputRef, history]);

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
        {LOGIN_STAGE.STEPID === "EMAIL" && (
          <UIForm.Input
            type={LOGIN_STAGE.INPUT.type}
            name={LOGIN_STAGE.INPUT.type}
            label={LOGIN_STAGE.INPUT.label}
            ref={inputRef}
          />
        )}

        {LOGIN_STAGE.STEPID === "PASSWORD" && (
          <UIForm.Input
            type={LOGIN_STAGE.INPUT.type}
            name={LOGIN_STAGE.INPUT.type}
            label={LOGIN_STAGE.INPUT.label}
          />
        )}

        <UIForm.Button
          buttonText={LOGIN_STAGE.BUTTON_TEXT}
          dataTestId="login-button"
          type="submit"
        />
      </UIForm>
      <TermsAndConditions />
      <Link to="/forgotpassword">
        <UILinkButton content="Forgot password" />
      </Link>
    </FormLayout>
  );
};

export default memo(LoginPage);
