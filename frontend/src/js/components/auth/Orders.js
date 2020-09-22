/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";

import { UIHeader } from "../shared";
import OrderCard from "../shared/OrderCard";
import ProtectedComponentWrapper from "./ProtectedComponentWrapper";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: grey;
`;

const Orders = () => {
  return (
    <ProtectedComponentWrapper>
      <Container>
        <UIHeader as="h4" header="Orders" />
        <OrderCard />
      </Container>
    </ProtectedComponentWrapper>
  );
};

export default Orders;
