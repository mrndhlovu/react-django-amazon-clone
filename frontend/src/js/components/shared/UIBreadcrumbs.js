/* eslint-disable no-confusing-arrow */
/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link, useHistory } from "react-router-dom";

import { getParamString, getPageId } from "../../utils/appUtils";

const SpanText = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme, active }) =>
    !active ? theme.colors.amazonBlue : theme.colors.amazonBright};
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  max-height: 10px;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  width: fit-content;
  justify-content: center;

  & > svg {
    font-size: 10px;
    margin-left: 8px;
    margin-right: 5px;
  }

  @media (max-width: 685px) {
  }
`;
const Container = styled.div`
  padding: 10px 0;
  position: absolute;
  top: 1%;
  left: 1;
  display: flex;
  vertical-align: top;
  justify-content: space-around;
  align-items: flex-start;

  a {
    text-decoration: none;
  }

  @media (max-width: 685px) {
    a {
      font-size: 10px;
      width: 21%;
    }
  }
`;

const UIBreadcrumbs = ({ breadCrumbs, onClick }) => {
  const history = useHistory();
  const routeParam = getPageId(history.location);

  return (
    <Container>
      {breadCrumbs.map((link) => (
        <Link
          key={uuid()}
          onClick={() => onClick(link.redirectTo)}
          to={`/${routeParam}?flowId=${getParamString(link.header)}`}>
          <SpanText
            onClick={() => onClick(link.redirectTo)}
            active={breadCrumbs.length === breadCrumbs.indexOf(link) + 1}>
            <span>{link.header}</span>
            {!(breadCrumbs.length === breadCrumbs.indexOf(link) + 1) && (
              <ArrowForwardIosIcon fontSize="small" />
            )}
          </SpanText>
        </Link>
      ))}
    </Container>
  );
};

UIBreadcrumbs.defaultProps = {
  onClick: () => {},
};

UIBreadcrumbs.propTypes = {
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClick: PropTypes.func,
};

export default UIBreadcrumbs;
