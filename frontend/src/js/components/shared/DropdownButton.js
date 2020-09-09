/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import UIDropdown from "./UIDropdown";

const DropdownButton = ({ content: LinkText, children }) => {
  const buttonRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  return (
    <Button
      ref={buttonRef}
      size="small"
      aria-label="select merge strategy"
      onClick={handleClick}
    >
      <LinkText />
      <ArrowDropDownIcon />
      {buttonRef.current && (
        <UIDropdown
          open={buttonRef.current === anchorEl}
          anchorEl={buttonRef.current}
        >
          {children}
        </UIDropdown>
      )}
    </Button>
  );
};

DropdownButton.propTypes = {
  content: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DropdownButton;
