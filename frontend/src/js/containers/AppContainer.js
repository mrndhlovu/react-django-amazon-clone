import React from "react";
import PropTypes from "prop-types";

import { MainContext } from "../utils/contextUtils";

const AppContainer = ({ children }) => {
  const openSideBarHandler = () => {};

  const context = {
    openSideBarHandler,
    user: { authenticated: false },
  };

  return (
    <MainContext.Provider value={context}>
      <div data-testid="app-container">{children}</div>
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
