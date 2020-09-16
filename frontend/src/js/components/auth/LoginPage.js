import React, { useRef, useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { AmazonButton, UIForm, TermsAndConditions } from "../shared";
import { LOGIN_STAGES } from "../../constants/constants";

import FormContainer from "./FormContainer";
import { loginUser, verifyUser } from "../selectors/authSelectors";
import { login, verify } from "../../actions/AuthActions";

const LoginPage = ({ user, _login, _verify }) => {
  const [loginData, setLoginData] = useState({});
  const history = useHistory();
  const inputRef = useRef(null);

  const [STAGE, setSTAGE] = useState(LOGIN_STAGES.EMAIL);

  const handleLogin = (data) => {
    switch (STAGE.STEP) {
      case 1:
        _verify(data);
        setLoginData({ ...loginData, email: data.email });
        return setSTAGE(LOGIN_STAGES.PASSWORD);

      case 2:
        setLoginData({ ...loginData, password: data.password });

        _login({ ...loginData, password: data.password });

        return null;

      default:
        return null;
    }
  };

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
  }, []);

  if (user.isAuthenticated) return <Redirect to="/" />;

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

const mapStateToProps = (state) => {
  return {
    user: loginUser(state),
    verified: verifyUser(state),
  };
};

LoginPage.propTypes = {
  _verify: PropTypes.func.isRequired,
  _login: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.shape({}),
  }).isRequired,
};

export default connect(mapStateToProps, { _login: login, _verify: verify })(
  LoginPage,
);
