import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const Container = styled.div`
  padding: 3% 20%;
  height: 100%;
  position: relative;

  & > h1 {
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    position: absolute;
    left: 0;
    top: 0;
  }

  @media (max-width: 1080px) {
    padding: 6% 10%;
  }
  @media (max-width: 845px) {
    padding: 6% 3%;

    h1 {
      margin-top: 15px;
      font-size: 15px;
      padding-left: 6%;
    }
  }

  @media (max-width: 685px) {
    padding: 12% 3%;
  }
`;

const UIContentWrapper = ({ children }) => <Container>{children}</Container>;

UIContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UIContentWrapper;
