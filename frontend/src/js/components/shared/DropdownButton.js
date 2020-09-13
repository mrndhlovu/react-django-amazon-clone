/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { Button, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  arrow: { color: "#fff" },
}))(Tooltip);

const DropdownButton = ({
  arrow,
  content: Content,
  contentText,
  button,
  placement,
  interactive,
}) => {
  const buttonRef = useRef(null);

  return (
    <LightTooltip
      arrow={arrow}
      placement={placement}
      title={Content && <Content />}
      interactive={interactive}
    >
      {button ? (
        <Button ref={buttonRef} size="small" aria-label="select merge strategy">
          {_.isString(contentText) ? contentText : contentText()}
          {arrow && <ArrowDropDownIcon />}
        </Button>
      ) : (
        <span>{_.isString(contentText) ? contentText : contentText()}</span>
      )}
    </LightTooltip>
  );
};

DropdownButton.defaultProps = {
  arrow: true,
  button: false,
  interactive: true,
  placement: "bottom",
};

DropdownButton.propTypes = {
  arrow: PropTypes.bool,
  content: PropTypes.func.isRequired,
  contentText: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  button: PropTypes.bool,
  placement: PropTypes.string,
  interactive: PropTypes.bool,
};

export default DropdownButton;
