import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { MainContext } from "../utils/contextUtils";
import { getUserAction } from "../actions/AuthActions";

const AppContainer = ({ children }) => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const openSideBarHandler = () => {};

  const logoutHandler = () => {};

  const context = {
    openSideBarHandler,
    logoutHandler,
    listener: auth,
    uiAlert: alert,
  };

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  return (
    <MainContext.Provider value={context}>
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
