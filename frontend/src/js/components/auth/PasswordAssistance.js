import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { UIForm, UIHeader, UILinkButton } from "../shared";

import {
  updatePasswordAction,
  passwordResetVerifyEmail,
  verifyOtpAction,
  resetChangePasswordFlow,
} from "../../actions/AuthActions";
import FormLayout from "../shared/FormLayout";

const Paragraph = styled.p`
  padding: 10px 0;
  font-size: 14px;

  & > ul > li {
    list-style: circle;
    margin-left: 5%;
  }
`;

const List = styled.ul`
  padding: 10px 0;
  font-size: 14px;

  & > li {
    list-style: circle;
    margin-left: 5%;
    line-height: 18px;
  }
`;

const Button = styled(UILinkButton)`
  margin-top: 10px;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const PasswordAssistance = () => {
  const dispatch = useDispatch();

  const {
    passwordReset: { RECOVERY_STAGE, data, resetSuccess },
  } = useSelector((state) => state);

  const [userData, setUserData] = useState({});

  const handlePasswordRecover = (inputData) => {
    setUserData({ ...userData, ...inputData });

    switch (RECOVERY_STAGE.STEPID) {
      case 1:
        return dispatch(passwordResetVerifyEmail({ ...inputData }));
      case 2:
        return dispatch(verifyOtpAction({ ...inputData }));

      case 3:
        return dispatch(
          updatePasswordAction({
            ...inputData,
            token: data.token,
            uidb64: data.uidb64,
          })
        );
      default:
        return null;
    }
  };

  if (resetSuccess) return <Redirect to="/login" />;

  return (
    <FormLayout header={RECOVERY_STAGE.HEADER} success={resetSuccess}>
      {RECOVERY_STAGE.STEPID === 1 && (
        <>
          <Paragraph>
            Enter the email address or mobile phone number associated with your
            Amazon account.
          </Paragraph>

          <UIForm
            validationSchema={RECOVERY_STAGE.VALIDATION}
            initialState={RECOVERY_STAGE.INITIAL_STATE}
            submitHandler={handlePasswordRecover}
          >
            <UIForm.Input
              type="email"
              name="email"
              label="E-mail or mobile phone number"
            />
            <UIForm.Button
              buttonText="Continue"
              dataTestId="login-button"
              type="submit"
            />
          </UIForm>

          <UIHeader
            as="h4"
            content=" Has your e-mail address or mobile phone number changed?"
          />
          <Paragraph>
            If you no longer use the e-mail address associated with your Amazon
            account, you may contact Customer Service for help restoring access
            to your account
          </Paragraph>
        </>
      )}

      {RECOVERY_STAGE.STEPID === 2 && (
        <>
          <Paragraph>{data?.message}</Paragraph>

          <UIForm
            validationSchema={RECOVERY_STAGE.VALIDATION}
            initialState={RECOVERY_STAGE.INITIAL_STATE}
            submitHandler={handlePasswordRecover}
          >
            <UIForm.Input type="text" name="otp" label="Enter OTP" />
            <UIForm.Button
              buttonText="Continue"
              dataTestId="login-button"
              type="submit"
            />
          </UIForm>
          <Button
            onClick={() => resetChangePasswordFlow()}
            content="Resend OTP"
          />
        </>
      )}

      {RECOVERY_STAGE.STEPID === 3 && (
        <>
          <Paragraph>
            We&apos;ll ask for this password whenever you sign in.
          </Paragraph>

          <UIForm
            validationSchema={RECOVERY_STAGE.VALIDATION}
            initialState={RECOVERY_STAGE.INITIAL_STATE}
            submitHandler={handlePasswordRecover}
          >
            <UIForm.Input
              name="password"
              type="password"
              label="New password"
            />
            <UIForm.Input
              name="confirm_password"
              type="password"
              label="Re-enter password"
            />

            <UIForm.Button
              buttonText="Save changes and sign in"
              dataTestId="login-button"
              type="submit"
            />
          </UIForm>

          <UIHeader as="h4" content="Secure password tips:" />

          <List>
            {RECOVERY_STAGE.TIPS.map((string) => (
              <li key={string}>{string}</li>
            ))}
          </List>
        </>
      )}
    </FormLayout>
  );
};

export default PasswordAssistance;
