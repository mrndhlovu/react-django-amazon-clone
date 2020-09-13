/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";

const AmazonButton = ({
  buttonText,
  handleClick,
  dataTestId,
  type,
  disabled,
  secondary,
}) => {
  return (
    <button
      data-testid={dataTestId}
      className={`amazon__button ${secondary ? "secondary" : "primary"}`}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      <span>{buttonText}</span>
    </button>
  );
};

AmazonButton.defaultProps = {
  dataTestId: "",
  type: "button",
  disabled: false,
  secondary: false,
};

AmazonButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
};

export default AmazonButton;
