import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { MainContext } from "../utils/contextUtils";
import { getUserAction } from "../actions/AuthActions";
import UILoadingSpinner from "../components/shared/UILoadingSpinner";

const AppContainer = ({ children }) => {
  const dispatch = useDispatch();
  const {
    spinner: { isLoading },
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

  return (
    <MainContext.Provider value={context}>
      {isLoading && <UILoadingSpinner />}
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
