import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Selector = styled.select`
  background-color: ${({ theme }) => theme.colors.grey};
  width: 100%;
  padding: 5px 8px;
  border-radius: 3px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.roboto};
  margin-top: 3px;
`;

const UISelector = ({ children }) => <Selector>{children}</Selector>;

UISelector.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UISelector;
