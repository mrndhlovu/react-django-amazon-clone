/* eslint-disable nonblock-statement-body-position */
/* eslint-disable indent */
/* eslint-disable no-confusing-arrow */
/* eslint-disable camelcase */
import React, { memo, useEffect } from "react";
import { v4 as uuid } from "uuid";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ProtectedComponentWrapper from "../auth/ProtectedComponentWrapper";
import { AmazonLogo, UIHeader } from "../shared";
import CheckoutAddress from "./CheckoutAddress";
import CompletePayment from "./CompletePayment";
import OrderConfirmation from "./OrderConfirmation";
import { nextCheckoutStageAction } from "../../actions/CartActions";
import {
  CONFIRM_ORDER,
  SELECT_CHECKOUT_ADDRESS,
} from "../../actions/ActionTypes";

const Container = styled.div`
  height: 100%;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.white};
`;

const PageHeader = styled.div`
  ${({ theme }) => theme.helpers.useFlex(null, null, "baseline")};
  position: relative;
  padding: 20px 0;

  svg {
    padding-right: 10px;
    padding-top: 11px;
  }
`;

const ProgressionContainer = styled.ul`
  ${({ theme }) => theme.helpers.useFlex()};
  justify-content: space-between;
  position: relative;
  width: fit-content;
  text-align: center;

  &::before {
    content: "";
    height: 2px;
    background-color: ${({ theme, active }) =>
      active ? theme.colors.amazon : theme.colors.grey};
    width: 100%;
    position: absolute;
    left: 0;
    top: 2px;
  }

  li:first-child {
    text-align: left;
  }
  li:last-child {
    text-align: right;
  }
`;

const ListItem = styled.li`
  padding: 10px;
  color: ${({ theme, active }) =>
    active ? theme.colors.amazonBright : theme.colors.amazon};
  font-size: 11px;
  font-weight: ${({ theme, active }) =>
    active ? theme.fonts.weight.bold : theme.fonts.weight.medium};
  position: relative;
  width: 100%;
  pointer-events: none;

  ${({ active }) =>
    active &&
    css`
      &::before {
        content: "\\1F6D2";
        position: absolute;
        top: -8px;
        transform: scaleX(-1);
      }
    `};
`;

const Content = styled.div`
  padding: 0 26%;
  height: 100%;
  h1 {
    color: ${({ theme }) => theme.colors.textGrey};
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    padding-bottom: 15px;
  }
`;

const Checkout = () => {
  const {
    auth: { data },
    checkout: { STAGE, CUSTOMER_CARDS },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data?.address?.city)
      dispatch(nextCheckoutStageAction(SELECT_CHECKOUT_ADDRESS));

    if (data?.address?.is_shipping_address && CUSTOMER_CARDS)
      dispatch(nextCheckoutStageAction(CONFIRM_ORDER));
  }, [data.address, dispatch, CUSTOMER_CARDS]);

  return (
    <ProtectedComponentWrapper>
      <Container>
        <Content>
          <PageHeader>
            <AmazonLogo fill="#000" />
            <CheckoutProgression active={STAGE.key} />
          </PageHeader>

          <UIHeader as="h1" content={STAGE.header} />
          {STAGE.key === "address" && (
            <CheckoutAddress address={data?.address} name={data?.full_name} />
          )}
          {STAGE.key === "confirm" && <OrderConfirmation />}
          {STAGE.key === "complete" && <CompletePayment />}
        </Content>
      </Container>
    </ProtectedComponentWrapper>
  );
};

const CheckoutProgression = ({ active }) => {
  const PROGRESSION_STAGES = ["ADDRESS", "CONFIRM", "COMPLETE"];

  return (
    <ProgressionContainer active={active}>
      {PROGRESSION_STAGES.map((stage) => (
        <ListItem active={stage === active.toUpperCase()} key={uuid()}>
          {stage}
        </ListItem>
      ))}
    </ProgressionContainer>
  );
};

CheckoutProgression.propTypes = {
  active: PropTypes.string.isRequired,
};

export default memo(Checkout);
