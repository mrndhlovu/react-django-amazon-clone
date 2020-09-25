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

const UILinkButton = ({ content, type, as, onClick, className, children }) => (
  <Button as={as} type={type} onClick={onClick} className={className}>
    {children || content}
  </Button>
);
UILinkButton.defaultProps = {
  className: "",
  as: "button",
  onClick: () => {},
  type: "button",
  content: "",
  children: undefined,
};

UILinkButton.propTypes = {
  className: PropTypes.string,
  as: PropTypes.string,
  content: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default UILinkButton;
