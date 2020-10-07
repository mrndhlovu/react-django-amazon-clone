import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const ShoppingCartCount = ({ dataTestId }) => {
  const {
    cart: { BASKET },
    auth: { isAuthenticated },
  } = useSelector((state) => state);

  const cartCount = isAuthenticated && BASKET?.item_count;

  return (
    <Link
      className="cart__container"
      data-testid={dataTestId}
      to="/shopping-basket"
    >
      <ShoppingCartIcon />
      <div className="cart__count">
        <span>{cartCount || 0}</span>
        <span>Basket</span>
      </div>
    </Link>
  );
};

ShoppingCartCount.defaultProps = { dataTestId: "" };

ShoppingCartCount.propTypes = {
  dataTestId: PropTypes.string,
};

export default ShoppingCartCount;
