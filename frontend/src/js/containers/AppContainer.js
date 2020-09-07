import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import { MainContext } from "../utils/contextUtils";

const AppContainer = ({ children }) => {
  const openSideBarHandler = () => {};

  const context = {
    openSideBarHandler,
  };

  return (
    <MainContext.Provider value={context}>
      <div data-testid="app-container">
        <Header />
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
