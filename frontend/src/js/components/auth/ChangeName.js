/* eslint-disable camelcase */
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { AmazonButton, UIForm } from "../shared";
import { NAME_FORM_VALIDATION } from "../../constants/constants";
import { updateUserAction } from "../../actions/AuthActions";
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
const INITIAL_STATE = { name: "" };

const ChangeName = () => {
  const {
    auth: {
      data: { email },
    },
    editProfile: { isUpdated },
  } = useSelector((state) => state);
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
        submitHandler={handleChangeName}
      >
        <UIForm.Input ref={inputRef} label="New name" name="name" type="name" />

        <UIForm.Button
          button={() => (
            <AmazonButton
              buttonText={isUpdated ? "Done" : "Continue"}
              type={isUpdated ? "button" : "submit"}
              disabled={isUpdated}
            />
          )}
        />
      </UIForm>
    </FormLayout>
  );
};

export default ChangeName;
