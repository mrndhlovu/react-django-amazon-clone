import React from "react";
import PropTypes from "prop-types";
import { NavLink, useHistory } from "react-router-dom";

import { ArrowDropDown as ArrowDropDownIcon } from "@material-ui/icons";
import { getQueryParam } from "../../utils/urlUtils";

const NavLinkButton = ({
  buttonText,
  subText,
  arrow,
  fontSize,
  redirectTo,
}) => {
  const history = useHistory();

  return (
    <NavLink to={getQueryParam(history, redirectTo, [buttonText, subText])}>
      <span className="link__text__first">{buttonText}</span>
      <span className="link__text__last">
        {subText && subText}
        {arrow && <ArrowDropDownIcon fontSize={fontSize} />}
      </span>
    </NavLink>
  );
};

NavLinkButton.defaultProps = {
  arrow: false,
  buttonText: "",
  fontSize: "small",
  redirectTo: "",
  subText: "",
};

NavLinkButton.propTypes = {
  arrow: PropTypes.bool,
  buttonText: PropTypes.string,
  fontSize: PropTypes.string,
  redirectTo: PropTypes.string,
  subText: PropTypes.string,
};

export default NavLinkButton;
