/* eslint-disable camelcase */
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { AmazonButton, UIForm } from "../shared";
import { PHONE_FORM_VALIDATION } from "../../constants/constants";
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
const INITIAL_STATE = { phone: "" };

const ChangePhone = () => {
  const {
    auth: { data },
    editProfile: { isUpdated },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleChangeEmail = (inputData) => {
    dispatch(updateUserAction({ ...data, phone_number: inputData.phone }));
  };

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
  });

  return (
    <FormLayout
      header={
        data?.phone_number
          ? "Change Mobile Phone Number"
          : "Add a Mobile Phone Number"
      }
    >
      <Paragraph>
        {data?.phone_number && (
          <>
            <p>Old mobile phone number:</p>
            <span>{`${data?.phone_number}`}</span>
          </>
        )}
      </Paragraph>

      <UIForm
        initialState={INITIAL_STATE}
        validationSchema={PHONE_FORM_VALIDATION}
        submitHandler={handleChangeEmail}
      >
        <UIForm.Input ref={inputRef} label="Mobile number" name="phone" />

        <UIForm.Button
          button={() => (
            <AmazonButton
              buttonText={isUpdated ? "Done" : "Continue"}
              type="submit"
              disabled={isUpdated}
            />
          )}
        />
      </UIForm>
      <AmazonButton secondary buttonText="Cancel" />
    </FormLayout>
  );
};

export default ChangePhone;
