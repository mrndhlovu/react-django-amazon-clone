import React, { useRef, useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { AmazonButton, UIForm, TermsAndConditions } from "../shared";
import { login, verify } from "../../actions/AuthActions";
import { loginUser, userAlert } from "../selectors/authSelectors";
import FormContainer from "./FormContainer";

const LoginPage = ({
  auth: { isAuthenticated, LOGIN_STAGE, error },
  _login,
  _verifyEmail,
}) => {
  const [loginData, setLoginData] = useState({});
  const history = useHistory();
  const inputRef = useRef(null);

  const handleLogin = (data) => {
    switch (LOGIN_STAGE.STEP) {
      case 1:
        setLoginData({ ...loginData, email: data.email });
        return _verifyEmail(data);
      case 2:
        setLoginData({ ...loginData, password: data.password });
        return _login({ ...loginData, password: data.password });
      default:
        return null;
    }
  };

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
  }, []);

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <FormContainer
      dataTestId="login-page-container"
      header="Sign-In"
      alert={error?.message}
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
    </FormContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: loginUser(state),
    alert: userAlert(state),
  };
};

LoginPage.propTypes = {
  _verifyEmail: PropTypes.func.isRequired,
  _login: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasAccount: PropTypes.bool.isRequired,
    data: PropTypes.shape({}),
    error: PropTypes.shape({ message: PropTypes.string }),
    LOGIN_STAGE: PropTypes.shape({
      STEP: PropTypes.number.isRequired,
      BUTTON_TEXT: PropTypes.string.isRequired,
      INITIAL_STATE: PropTypes.shape({}).isRequired,
      INPUT: PropTypes.shape({
        type: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
      VALIDATION: PropTypes.shape({}),
    }),
  }).isRequired,
};

export default connect(mapStateToProps, {
  _login: login,
  _verifyEmail: verify,
})(LoginPage);
