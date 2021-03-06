import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { useMainContext } from "../../utils/hookUtils";

const NavCartButton = styled.button`
  ${({ theme }) => theme.helpers.useFlex("row", "space-evenly", "flex-end")};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  padding: 5px 10px;
  background-color: transparent;
  border-color: transparent;

  &:hover {
    border-color: ${({ theme }) => theme.colors.white};
  }

  & > div {
    ${({ theme }) => theme.helpers.useFlex("column")};
    font-weight: ${({ theme }) => theme.colors.white};
  }

  svg {
    font-size: 18px;
  }

  & > span {
    ${({ theme }) => theme.helpers.useFlex("column", "flex-start")};
  }

  & > div > span:first-child {
    color: ${({ theme }) => theme.colors.amazonBright};
  }

  & > div > span:last-child {
    font-size: 11px;
  }

  @media (max-width: 970px) {
    svg {
      font-size: 15px;
    }

    & > div > span:last-child {
      font-size: 10px;
    }
  }

  @media (max-width: 845px) {
    &:hover {
      border-color: transparent;
    }
  }
`;

const ShoppingCartCount = ({ dataTestId }) => {
  const {
    cart: { BASKET },
    user: { isAuthenticated },
  } = useMainContext();
  const history = useHistory();
  const cartCount = isAuthenticated && BASKET?.item_count;

  return (
    <NavCartButton
      data-testid={dataTestId}
      type="button"
      onClick={() => history.push("/shopping-basket")}>
      <>
        <ShoppingCartIcon />
        <div>
          <span>{cartCount || 0}</span>
          <span>Basket</span>
        </div>
      </>
    </NavCartButton>
  );
};

ShoppingCartCount.defaultProps = { dataTestId: "" };

ShoppingCartCount.propTypes = {
  dataTestId: PropTypes.string,
};

export default ShoppingCartCount;
