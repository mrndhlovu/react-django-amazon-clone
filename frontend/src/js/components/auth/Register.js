import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

import "./_auth.scss";

import { Divider } from "@material-ui/core";

import AmazonLogo from "../header/AmazonLogo";
import { AmazonButton, UIForm, TermAndConditions } from "../shared";

const REGISTER_INITIAL_STATE = {
  name: undefined,
  email: undefined,
  password: undefined,
  confirm_password: undefined,
};

const VALIDATION_SCHEMA = yup.object({
  name: yup.string().required().min(8),
  email: yup.string().required(),
  password: yup.string().required().min(6),
  confirm_password: yup.string().required().min(6),
});

const Register = () => {
  const handleLogin = () => {};

  return (
    <div
      data-testid="register-page-container"
      className="auth__page__container "
    >
      <div className="form__container register">
        <Link to="/">
          <AmazonLogo
            dataTestId="register-page-logo"
            height="60"
            width="100"
            fill="#000"
          />
        </Link>

        <UIForm
          dataTestId="register-form"
          initialState={REGISTER_INITIAL_STATE}
          submitHandler={handleLogin}
          validationSchema={VALIDATION_SCHEMA}
        >
          <UIForm.Input type="name" name="name" label="Your name" />

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
            button={({ isSubmitting }) => (
              <AmazonButton
                buttonText="Create your Amazon account"
                dataTestId="register-button"
                handleClick={() => {}}
                type="submit"
                disabled={isSubmitting}
              />
            )}
          />
          <TermAndConditions />

          <div className="auth__divider__account">
            <Divider />
            <span>Already have an account?</span>
            <Link to="/login">Sign in</Link>
          </div>
        </UIForm>
      </div>
    </div>
  );
};

export default Register;
