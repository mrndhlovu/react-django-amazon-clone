import React from "react";
import PropTypes from "prop-types";
import Navigation from "../components/Navigation";

const AppContainer = ({ children }) => (
  <div data-testid="app-container">
    <Navigation />
    {children}
  </div>
);

AppContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppContainer;
