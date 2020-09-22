/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";

import { UIHeader } from "../shared";
import OrderCard from "../shared/OrderCard";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: grey;
`;

const Orders = () => {
  return (
    <Container>
      <UIHeader as="h4" header="Orders" />
      <OrderCard />
    </Container>
  );
};

export default Orders;
