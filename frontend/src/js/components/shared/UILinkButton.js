import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #3ea6ff;
  border: none;
`;

const UILinkButton = ({
  content, type, as, onClick, className,
}) => (
  <Button as={as} type={type} onClick={onClick} className={className}>
    {content}
  </Button>
);
UILinkButton.defaultProps = {
  className: "",
  as: "button",
  onClick: () => {},
  type: "button",
};

UILinkButton.propTypes = {
  className: PropTypes.string,
  as: PropTypes.string,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default UILinkButton;
