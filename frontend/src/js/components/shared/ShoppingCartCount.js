import React from "react";
import PropTypes from "prop-types";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const ShoppingCartCount = ({ count, dataTestId }) => {
  return (
    <div data-testid={dataTestId} className="cart__container">
      <span className="cart__count">{count}</span>
      <ShoppingCartIcon />
      <span>Basket</span>
    </div>
  );
};

ShoppingCartCount.defaultProps = { count: 0, dataTestId: "" };

ShoppingCartCount.propTypes = {
  count: PropTypes.number,
  dataTestId: PropTypes.string,
};

export default ShoppingCartCount;
