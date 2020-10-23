import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 44%;
  width: 100%;
  background-color: #232f3e;

  @media (max-width: 845px) {
    background-color: ${({ theme }) => theme.colors.amazonMobile};
  }
`;

const UIFooter = () => {
  return <Container>Footer</Container>;
};

export default UIFooter;
