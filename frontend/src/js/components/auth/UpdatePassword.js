/* eslint-disable camelcase */
import React, { useRef, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { UIForm } from "../shared";
import { CHANGE_PASSWORD_VALIDATION } from "../../constants/constants";
import { updatePasswordAction } from "../../actions/AuthActions";
import FormLayout from "../shared/FormLayout";

const Paragraph = styled.p`
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

const Container = styled(FormLayout)`
  & > a::first-child {
    visibility: hidden;
  }

  .amazon__form__logo {
    display: none !important;
  }
`;

const INITIAL_STATE = {
  password: "",
  new_password: "",
  confirm_password: "",
};

const UpdatePassword = () => {
  const {
    passwordReset: { isUpdated },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const inputConfirmRef = useRef();
  const inputPassRef = useRef();

  const handleChangePassword = (inputData) => {
    dispatch(updatePasswordAction({ ...inputData }, true));
  };

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
  });

  return (
    <Container className="change__password__form">
      <Paragraph>
        <span>
          {isUpdated
            ? "Your password has beed updated. Login again."
            : "Use the form below to change your Fake Amazon Account."}
        </span>
      </Paragraph>

      {!isUpdated && (
        <UIForm
          initialState={INITIAL_STATE}
          validationSchema={CHANGE_PASSWORD_VALIDATION}
          submitHandler={handleChangePassword}
        >
          <UIForm.Input
            ref={inputRef}
            label="Current password"
            name="password"
            type="password"
          />
          <UIForm.Input
            ref={inputPassRef}
            label="New password"
            name="new_password"
            type="password"
          />
          <UIForm.Input
            ref={inputConfirmRef}
            label="Re-enter password"
            name="confirm_password"
            type="password"
          />

          <UIForm.Button
            buttonText={isUpdated ? "Login" : "Save changes"}
            type={isUpdated ? "button" : "submit"}
          />
        </UIForm>
      )}
    </Container>
  );
};

export default memo(UpdatePassword);
