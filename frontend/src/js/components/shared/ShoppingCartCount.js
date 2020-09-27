import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { getQueryParam } from "../../api/urls";

const ShoppingCartCount = ({ dataTestId }) => {
  const history = useHistory();
  const { items } = useSelector((state) => state.cart);

  return (
    <Link
      className="cart__container"
      data-testid={dataTestId}
      to={getQueryParam(history)}
    >
      <ShoppingCartIcon />
      <div className="cart__count">
        <span>{items.length}</span>
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
