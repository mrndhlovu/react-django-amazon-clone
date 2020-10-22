import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ArrowDropDown as ArrowDropDownIcon } from "@material-ui/icons";

const LinkItem = styled.button`
  background-color: transparent;
  border-color: transparent;
  border-radius: 3px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.white};
  }

  & span:first-child {
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    font-size: 12px;
    padding-bottom: 3px;
  }

  & span:last-child {
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    font-size: 14px;
  }

  @media (max-width: 1645px) {
    & span:last-child,
    span:first-child {
      font-size: 11px;
    }
  }
`;

const NavLinkButton = ({
  buttonText,
  subText,
  arrow,
  fontSize,
  redirectTo,
}) => {
  const history = useHistory();

  return (
    <LinkItem onClick={() => history.push(redirectTo)} type="button">
      <span className="link__text__first">{buttonText}</span>
      <span className="link__text__last">
        {subText && subText}
        {arrow && <ArrowDropDownIcon fontSize={fontSize} />}
      </span>
    </LinkItem>
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
