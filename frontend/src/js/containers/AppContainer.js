import React, { useEffect, memo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getProductList } from "../actions/ProductActions";
import { getShoppingBasketAction } from "../actions/CartActions";
import { getUserAction } from "../actions/AuthActions";
import { MainContext } from "../utils/contextUtils";
import Header from "../components/header/Header";

const AppContainer = ({ children }) => {
  const {
    auth: { isAuthenticated },
  } = useSelector((state) => state);
  const { search } = useLocation();

  const dispatch = useDispatch();

  const openSideBarHandler = () => {};

  const logoutHandler = () => {};

  const context = {
    openSideBarHandler,
    logoutHandler,
  };

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  useEffect(() => {
    if (!search) dispatch(getProductList());
  }, [dispatch, search]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getShoppingBasketAction());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <MainContext.Provider value={context}>
      <Header />
      <div className="app__container" data-testid="app-container">
        {children}
      </div>
    </MainContext.Provider>
  );
};

AppContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(AppContainer);
