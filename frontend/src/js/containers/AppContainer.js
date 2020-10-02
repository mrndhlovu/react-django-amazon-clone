import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { MainContext } from "../utils/contextUtils";
import { getUserAction } from "../actions/AuthActions";
import UILoadingSpinner from "../components/shared/UILoadingSpinner";
import Header from "../components/header/Header";
import { getProductList } from "../actions/ProductActions";

const AppContainer = ({ children }) => {
  const dispatch = useDispatch();
  const {
    spinner: { isLoading },
    auth: { isAuthenticated },
  } = useSelector((state) => state);

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
    if (isAuthenticated) dispatch(getProductList());
  }, [isAuthenticated]);

  return (
    <MainContext.Provider value={context}>
      {isLoading && <UILoadingSpinner />}
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
