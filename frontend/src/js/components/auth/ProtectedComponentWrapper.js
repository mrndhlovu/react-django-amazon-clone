/* eslint-disable nonblock-statement-body-position */
import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useMainContext } from "../../utils/hookUtils";

const ProtectedComponentWrapper = ({ children }) => {
  const { isAuthenticated } = useMainContext().user;
  const location = useLocation();
  const via = location.pathname.slice(1).split("/")[0];

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location, via },
        }}
      />
    );
  }

  return <>{children}</>;
};

ProtectedComponentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedComponentWrapper;
