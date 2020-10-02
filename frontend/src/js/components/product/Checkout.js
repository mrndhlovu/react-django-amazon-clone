import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import ProtectedComponentWrapper from "../auth/ProtectedComponentWrapper";
import { AmazonLogo } from "../shared";
import { CHECKOUT_STAGES } from "../../constants/constants";

const Container = styled.div`
  height: 100%;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.white};
`;

const PageHeader = styled.div`
  ${({ theme }) => theme.helpers.useFlex()};
  width: 100%;

  padding: 15px;

  svg {
    padding-right: 10px;
  }
`;

const ProgressionContainer = styled.ul`
  ${({ theme }) => theme.helpers.useFlex()};
  position: relative;

  &::before {
    content: "";
    height: 1px;
    background-color: ${({ theme }) => theme.colors.amazon};
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const ListItem = styled.li`
  padding: 10px;
  color: ${({ theme }) => theme.colors.amazon};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  position: relative;

  ${({ active }) =>
    active &&
    css`
      &::before {
        content: "\\1F6D2";
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: -8px;
        transform: scaleX(-1);
      }
    `};
`;

const Checkout = () => {
  const [activeStage, setActiveStage] = useState("ADDRESS");

  return (
    <ProtectedComponentWrapper>
      <Container>
        <PageHeader>
          <AmazonLogo fill="#000" />
          <CheckoutProgression active={activeStage} />
        </PageHeader>
      </Container>
    </ProtectedComponentWrapper>
  );
};

const CheckoutProgression = ({ active }) => {
  return (
    <ProgressionContainer>
      {CHECKOUT_STAGES.map((stage) => (
        <ListItem active={stage === active} key={uuid()}>
          <span>{stage}</span>
        </ListItem>
      ))}
    </ProgressionContainer>
  );
};

CheckoutProgression.propTypes = {
  active: PropTypes.string.isRequired,
};

export default Checkout;
