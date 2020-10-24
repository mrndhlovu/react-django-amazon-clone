/* eslint-disable camelcase */
import React, { useRef, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { UIForm } from "../shared";
import { NAME_FORM_VALIDATION } from "../../constants/constants";
import { updateUserAction } from "../../actions/AuthActions";
import FormLayout from "../shared/FormLayout";
import { useMainContext } from "../../utils/hookUtils";

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
const INITIAL_STATE = { name: "" };

const ChangeName = () => {
  const {
    user: {
      data: { email },
    },
    editProfile: { isUpdated },
  } = useMainContext();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleChangeName = (inputData) => {
    dispatch(updateUserAction({ email, full_name: inputData.full_name }));
  };

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
  });

  return (
    <FormLayout header="Change Your Name">
      <Paragraph>
        <span>
          Enter new name you would like to associate with your account below.
        </span>
      </Paragraph>
      <UIForm
        initialState={INITIAL_STATE}
        validationSchema={NAME_FORM_VALIDATION}
        submitHandler={handleChangeName}>
        <UIForm.Input ref={inputRef} label="New name" name="name" type="name" />
        <UIForm.Button
          buttonText={isUpdated ? "Done" : "Continue"}
          type={isUpdated ? "button" : "submit"}
          disabled={isUpdated}
        />
      </UIForm>
    </FormLayout>
  );
};

export default memo(ChangeName);
