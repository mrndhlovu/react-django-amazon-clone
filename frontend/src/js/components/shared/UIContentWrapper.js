import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import UIHeader from "./UIHeader";

const Container = styled.div`
  padding: 5% 7%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};

  & > h1 {
    padding-left: 13px;
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }
`;

const UIContentWrapper = ({ children, header }) => {
  return (
    <Container>
      <UIHeader content={header} />
      {children}
    </Container>
  );
};

UIContentWrapper.defaultProps = { header: "" };

UIContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
};

export default UIContentWrapper;
