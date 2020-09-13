import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { getQueryParam } from "../../utils/urls";

const ShoppingCartCount = ({ count, dataTestId }) => {
  const history = useHistory();

  return (
    <Link
      className="cart__container"
      data-testid={dataTestId}
      to={getQueryParam(history)}
    >
      <ShoppingCartIcon />
      <div className="cart__count">
        <span>{count}</span>
        <span>Basket</span>
      </div>
    </Link>
  );
};

ShoppingCartCount.defaultProps = { count: 0, dataTestId: "" };

ShoppingCartCount.propTypes = {
  count: PropTypes.number,
  dataTestId: PropTypes.string,
};

export default ShoppingCartCount;
