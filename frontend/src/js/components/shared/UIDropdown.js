/* eslint-disable object-curly-newline */
import React from "react";
import PropTypes from "prop-types";

import Popper from "@material-ui/core/Popper";

const UIDropdown = ({ children, placement, as, open, anchorEl }) => {
  const id = open ? "simple-popper" : undefined;

  return (
    <Popper
      as={as}
      id={id}
      open={open}
      anchorEl={anchorEl}
      variant="popper"
      placement={placement}
      modifiers={{
        avoidPoppersCollisions: {
          enabled: true,
        },
      }}
    >
      {children}
    </Popper>
  );
};

UIDropdown.defaultProps = {
  anchorEl: () => {},
  placement: "bottom",
  as: "",
  open: false,
};

UIDropdown.propTypes = {
  children: PropTypes.node.isRequired,
  anchorEl: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.element,
  ]),
  placement: PropTypes.string,
  as: PropTypes.string,
  open: PropTypes.bool,
};

export default UIDropdown;
