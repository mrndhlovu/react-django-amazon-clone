import React from "react";
import PropTypes from "prop-types";

import { Divider } from "@material-ui/core";

const TextDivider = ({ text }) => {
  return (
    <div className="text__divider">
      <span>{text}</span>
      <Divider />
    </div>
  );
};

TextDivider.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextDivider;
