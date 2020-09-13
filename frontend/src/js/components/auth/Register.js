import React from "react";
import { FORM_VALIDATION } from "../../constants/constants";

import { AmazonButton, UIForm, TermsAndConditions } from "../shared";
import FormContainer from "./FormContainer";

const REGISTER_INITIAL_STATE = {
  name: undefined,
  email: undefined,
  password: undefined,
  confirm_password: undefined,
};

const Register = () => {
  const handleRegister = () => {};

  return (
    <FormContainer
      dataTestId="register-page-container"
      header="Create account"
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
        <TermsAndConditions />
      </UIForm>
    </FormContainer>
  );
};

export default Register;
