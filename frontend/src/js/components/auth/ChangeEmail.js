/* eslint-disable camelcase */
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { UIForm } from "../shared";
import { EMAIL_FORM_VALIDATION } from "../../constants/constants";
import { updateUserAction } from "../../actions/AuthActions";
import FormLayout from "../shared/FormLayout";

const Paragraph = styled.span`
  padding: 10px 0;
  font-size: 14px;

  & > ul > li {
    list-style: circle;
    margin-left: 5%;
  }
  & > p {
    padding: 10px 0;
  }
`;
const INITIAL_STATE = { email: "" };

const ChangeEmail = () => {
  const {
    auth: {
      data: { full_name, email },
    },
    editProfile: { isUpdated },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleChangeEmail = (inputData) => {
    dispatch(updateUserAction({ full_name, email: inputData.email }));
  };

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
  });

  return (
    <FormLayout header="Change your email address">
      <Paragraph>
        <p>{`Current email address: ${email}`}</p>
        <span>
          Enter the new email you would like to associate with your account
          below. We will send a One Time Password (OTP) to that address
        </span>
      </Paragraph>

      <UIForm
        initialState={INITIAL_STATE}
        validationSchema={EMAIL_FORM_VALIDATION}
        submitHandler={handleChangeEmail}
      >
        {!isUpdated && (
          <UIForm.Input
            ref={inputRef}
            label="New email address"
            name="email"
            type="email"
          />
        )}
        <UIForm.Button
          buttonText={isUpdated ? "Done" : "Continue"}
          type={isUpdated ? "button" : "submit"}
          disabled={isUpdated}
        />
      </UIForm>
    </FormLayout>
  );
};

export default ChangeEmail;
