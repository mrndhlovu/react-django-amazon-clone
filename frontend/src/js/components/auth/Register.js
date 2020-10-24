import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

import { registerAction } from "../../actions/AuthActions";
import { FORM_VALIDATION } from "../../constants/constants";
import { useMainContext } from "../../utils/hookUtils";

import { UIForm, TermsAndConditions } from "../shared";
import FormLayout from "../shared/FormLayout";

const REGISTER_INITIAL_STATE = {
  full_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const {
    user: { isAuthenticated },
    register: { isLoading },
  } = useMainContext();
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleRegister = (data) => dispatch(registerAction(data));

  useEffect(() => {
    if (nameRef?.current) nameRef.current.focus();
  }, []);

  if (isAuthenticated) return <Redirect to={from.pathname} />;

  return (
    <FormLayout
      dataTestId="register-page-container"
      header="Create account"
      footerLinkProps={{
        content: "Already have an account?",
        linkText: "Sign in",
        link: "/login",
      }}>
      <UIForm
        dataTestId="register-form"
        initialState={REGISTER_INITIAL_STATE}
        submitHandler={handleRegister}
        validationSchema={FORM_VALIDATION.REGISTER}>
        <UIForm.Input label="Your name" name="full_name" ref={nameRef} />
        <UIForm.Input type="email" name="email" label="E-mail" ref={emailRef} />

        <UIForm.Input
          type="password"
          name="password"
          label="Password"
          placeholder="At least six characters"
          ref={passwordRef}
        />
        <UIForm.Input
          type="password"
          name="confirm_password"
          label="Re-enter password"
          ref={confirmPasswordRef}
        />
        <UIForm.Button
          buttonText="Create your Amazon account"
          dataTestId="register-button"
          type="submit"
          disabled={isLoading}
        />
        <TermsAndConditions />
      </UIForm>
    </FormLayout>
  );
};

export default Register;
