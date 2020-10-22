import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Divider } from "@material-ui/core";

const Container = styled.div`
  position: relative;
  width: 100%;
  bottom: 0;

  span {
    ${({ theme }) => theme.helpers.absoluteCenter("-7px")}
    background-color: ${({ theme }) => theme.colors.white};
    padding: 0 5px;
    font-size: 12px;
  }
`;

const TextDivider = ({ content }) => {
  return (
    <Container>
      <span>{content}</span>
      <Divider />
    </Container>
  );
};

TextDivider.defaultProps = { content: "" };

TextDivider.propTypes = {
  content: PropTypes.string,
};

export default TextDivider;
