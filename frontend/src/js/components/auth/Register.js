import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { register } from "../../actions/AuthActions";
import { FORM_VALIDATION } from "../../constants/constants";
import { registerUser } from "../selectors/authSelectors";
import { useMainContext } from "../../utils/hookUtils";

import { AmazonButton, UIForm, TermsAndConditions } from "../shared";
import FormLayout from "../shared/FormLayout";

const REGISTER_INITIAL_STATE = {
  full_name: undefined,
  email: undefined,
  password: undefined,
  confirm_password: undefined,
};

const Register = ({ _register, user: { isLoading, error } }) => {
  const { listener } = useMainContext();
  const nameRef = useRef(null);

  const handleRegister = (data) => {
    _register(data);
  };

  useEffect(() => {
    if (nameRef?.current) nameRef.current.focus();
  }, []);

  if (listener.isAuthenticated) return <Redirect to="/" />;

  return (
    <FormLayout
      dataTestId="register-page-container"
      header="Create account"
      alert={error?.message}
      footerLinkProps={{
        content: "Already have an account?",
        linkText: "Sign in",
        link: "/login",
      }}
    >
      <UIForm
        dataTestId="register-form"
        initialState={REGISTER_INITIAL_STATE}
        submitHandler={handleRegister}
        validationSchema={FORM_VALIDATION.REGISTER}
      >
        <UIForm.Input
          label="Your name"
          name="full_name"
          ref={nameRef}
          type="text"
        />

        <UIForm.Input type="email" name="email" label="E-mail" />

        <UIForm.Input
          type="password"
          name="password"
          label="Password"
          placeholder="At least six characters"
        />
        <UIForm.Input
          type="password"
          name="confirm_password"
          label="Re-enter password"
        />

        <UIForm.Button
          button={() => (
            <AmazonButton
              buttonText="Create your Amazon account"
              dataTestId="register-button"
              handleClick={() => {}}
              type="submit"
              disabled={isLoading}
            />
          )}
        />
        <TermsAndConditions />
      </UIForm>
    </FormLayout>
  );
};

const mapStateToProps = (state) => ({
  user: registerUser(state),
});

Register.propTypes = {
  user: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.shape({ message: PropTypes.string }),
  }).isRequired,
  _register: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { _register: register })(Register);
