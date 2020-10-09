/* eslint-disable camelcase */
import React, { useRef, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { updateUserAction } from "../../actions/AuthActions";
import OrderCard from "../shared/OrderCard";
import ProtectedComponentWrapper from "./ProtectedComponentWrapper";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: grey;
`;

// const INITIAL_STATE = { email: "" };

const Address = () => {
  const {
    auth: {
      data: { full_name },
    },
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
    <ProtectedComponentWrapper>
      <Container>
        <OrderCard />
      </Container>
    </ProtectedComponentWrapper>
  );
};

export default memo(Address);
