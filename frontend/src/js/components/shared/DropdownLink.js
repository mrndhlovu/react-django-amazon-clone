/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import UIDropdown from "./UIDropdown";

const DropdownLink = ({ content: LinkText, children }) => {
  const linkRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  return (
    <li ref={linkRef} onKeyDown={handleClick} onClick={handleClick}>
      <LinkText />
      {linkRef.current && (
        <UIDropdown
          open={linkRef.current === anchorEl}
          anchorEl={linkRef.current}
        >
          {children}
        </UIDropdown>
      )}
    </li>
  );
};

DropdownLink.propTypes = {
  content: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DropdownLink;
