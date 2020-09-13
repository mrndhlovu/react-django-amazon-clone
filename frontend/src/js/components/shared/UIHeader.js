import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledH1 = styled.h1`
  color: ${({ color }) => color};
  text-align: ${({ align }) => align};
`;

const UIHeader = ({
  content, as, className, color, align,
}) => (
  <StyledH1 align={align} color={color} className={className} as={as}>
    {content}
  </StyledH1>
);

UIHeader.defaultProps = {
  as: "", className: "", color: "", align: "left",
};

UIHeader.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  content: PropTypes.string.isRequired,
  align: PropTypes.string,
};

export default UIHeader;
