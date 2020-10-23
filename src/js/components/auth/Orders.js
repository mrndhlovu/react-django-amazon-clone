/* eslint-disable camelcase */
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import { getCompletedOrdersAction } from "../../actions/CartActions";
import { UIHeader } from "../shared";
import OrderList from "../product/OrderList";
import ProtectedComponentWrapper from "./ProtectedComponentWrapper";
import UISmall from "../shared/UISmall";

const Container = styled.div`
  height: 100%;
  width: 100%;

  img {
    height: 69px;
    width: auto;
  }
  ul {
    padding: 0;
  }
`;

const OrderContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 3px;
  margin-bottom: 10px;
  position: relative;
  margin-top: 15px;
`;

const OrderHeader = styled.div`
  position: absolute;
  right: 10px;
  top: -10px;
  background-color: ${({ theme }) => theme.colors.white};
  padding-left: 5px;

  small {
    color: ${({ theme }) => theme.colors.amazon};
    padding-right: 5px;
    font-size: 11px;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }

  @media (max-width: 685px) {
   small{
     font-size:8.5px;
   }
 
  }
`;

const Orders = () => {
  const {
    cart: { COMPLETED_ORDERS },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompletedOrdersAction());
  }, [dispatch]);

  return (
    <ProtectedComponentWrapper>
      <Container>
        <UIHeader as="h4" header="Orders" />
        {COMPLETED_ORDERS &&
          COMPLETED_ORDERS.map((order) => (
            <OrderContainer key={uuid()}>
              <OrderHeader>
                <UISmall content={`ID: ${order?.stripe_complete_id}`} />
                <UISmall content={`| ${order?.timestamp}`} />
              </OrderHeader>
              <OrderList order={order} />
            </OrderContainer>
          ))}
      </Container>
    </ProtectedComponentWrapper>
  );
};

export default memo(Orders);
