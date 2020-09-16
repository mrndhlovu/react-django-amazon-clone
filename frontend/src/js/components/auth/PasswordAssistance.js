import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import { AmazonButton, UIForm, UIHeader } from "../shared";
import { recoverUser, userAlert } from "../selectors/authSelectors";
import { updatePassword, verify } from "../../actions/AuthActions";
import FormLayout from "../shared/FormLayout";

const Paragraph = styled.p`
  padding: 10px 0;
  font-size: 14px;

  & > ul > li {
    list-style: circle;
    margin-left: 5%;
  }
`;

const Button = styled.button`
  &.resend__otp {
    margin-top: 10px;
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    color: ${({ theme }) => theme.colors.amazonBlue};

    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

const PasswordAssistance = ({
  auth: { RECOVERY_STAGE },
  _verifyEmail,
  _updatePassword,
}) => {
  const [userData, setLoginData] = useState({});

  const handlePasswordRecover = (data) => {
    switch (RECOVERY_STAGE.STEPID) {
      case 1:
        setLoginData({ ...userData, email: data.email });
        return _verifyEmail(data);
      case 2:
        setLoginData({
          ...RECOVERY_STAGE.INITIAL_STATE,
          password: data.password,
        });
        return _updatePassword({ ...userData, password: data.password });

      case 3:
        setLoginData({ ...userData, password: data.password });
        return _updatePassword({ ...userData, password: data.password });
      default:
        return null;
    }
  };

  return (
    <FormLayout header={RECOVERY_STAGE.HEADER}>
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
              button={({ isSubmitting }) => (
                <AmazonButton
                  buttonText="Continue"
                  dataTestId="login-button"
                  type="submit"
                  disabled={isSubmitting}
                />
              )}
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
          <Paragraph>
            {`For your security, we need to authenticate your request. We've sent
            a One Time Password (OTP) to the ${RECOVERY_STAGE?.data?.message}. Please
            enter it below to complete verification`}
          </Paragraph>

          <UIForm
            validationSchema={RECOVERY_STAGE.VALIDATION}
            initialState={RECOVERY_STAGE.INITIAL_STATE}
            submitHandler={handlePasswordRecover}
          >
            <UIForm.Input type="text" name="text" label="Enter OTP" />
            <UIForm.Button
              button={({ isSubmitting }) => (
                <AmazonButton
                  buttonText="Continue"
                  dataTestId="login-button"
                  type="submit"
                  disabled={isSubmitting}
                />
              )}
            />
          </UIForm>

          <Button className="resend__otp">Resend OTP</Button>
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
            <UIForm.Input type="password" label="New password" />
            <UIForm.Input type="password" label="Re-enter password" />

            <UIForm.Button
              button={({ isSubmitting }) => (
                <AmazonButton
                  buttonText="Save changes and sign in"
                  dataTestId="login-button"
                  type="submit"
                  disabled={isSubmitting}
                />
              )}
            />
          </UIForm>

          <UIHeader as="h4" content="Secure password tips:" />
          <Paragraph>
            <ul>
              {RECOVERY_STAGE.TIPS.map((string) => (
                <li key={string}>{string}</li>
              ))}
            </ul>
          </Paragraph>
        </>
      )}
    </FormLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: recoverUser(state),
    alert: userAlert(state),
  };
};

PasswordAssistance.propTypes = {
  _verifyEmail: PropTypes.func.isRequired,
  _updatePassword: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    hasAccount: PropTypes.bool.isRequired,
    data: PropTypes.shape({}),
    error: PropTypes.shape({ message: PropTypes.string }),
    RECOVERY_STAGE: PropTypes.shape({
      HEADER: PropTypes.isRequired,
      STEPID: PropTypes.number.isRequired,
      PASSWORD: PropTypes.shape({}),
      INITIAL_STATE: PropTypes.shape({}),
      PASSWORD_NEW: PropTypes.shape({}),
      CONFIRM_PASSWORD: PropTypes.shape({}),
      data: PropTypes.shape({ message: PropTypes.string }),
      VALIDATION: PropTypes.shape({}),
      TIPS: PropTypes.shape([]),
    }),
  }).isRequired,
};

export default connect(mapStateToProps, {
  _updatePassword: updatePassword,
  _verifyEmail: verify,
})(PasswordAssistance);
