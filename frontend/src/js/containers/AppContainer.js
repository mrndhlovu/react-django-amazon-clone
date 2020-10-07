import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getProductList } from "../actions/ProductActions";
import { getUserAction } from "../actions/AuthActions";
import { getShoppingBasketAction } from "../actions/CartActions";
import { MainContext } from "../utils/contextUtils";
import Header from "../components/header/Header";

const AppContainer = ({ children }) => {
  const {
    auth: { isAuthenticated },
  } = useSelector((state) => state);
  const { search } = useLocation();
  const token = localStorage.getItem("access");

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
    if (isAuthenticated && token) {
      dispatch(getShoppingBasketAction());
    }
  }, [isAuthenticated, dispatch, token]);

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

export default AppContainer;
