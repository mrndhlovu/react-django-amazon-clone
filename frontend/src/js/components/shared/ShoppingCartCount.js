import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { getCartDetails } from "../../utils/appUtils";

const ShoppingCartCount = ({ dataTestId }) => {
  const { items } = useSelector((state) => state.cart);
  const { cartCount } = getCartDetails(items);

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
