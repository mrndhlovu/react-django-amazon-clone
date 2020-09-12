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
      className={
        secondary ? "amazon__button__secondary" : "amazon__button__primary"
      }
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
