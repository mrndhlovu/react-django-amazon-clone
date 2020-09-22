/* eslint-disable camelcase */
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { AmazonButton, UIForm, UIHeader } from "../shared";
import { EMAIL_VALIDATION } from "../../constants/constants";
import { updateUserAction } from "../../actions/AuthActions";
import FormLayout from "../shared/FormLayout";
import OrderCard from "../shared/OrderCard";

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
const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: grey;
`;

const INITIAL_STATE = { email: "" };

const Address = () => {
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
    <Container>
      <OrderCard />
    </Container>
  );
};

export default Address;
