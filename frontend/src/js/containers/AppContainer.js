import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { MainContext } from "../utils/contextUtils";
import { getUserInfo } from "../actions/AuthActions";
import { getUser } from "../components/selectors/authSelectors";

const AppContainer = ({ children, user, userInfo }) => {
  const openSideBarHandler = () => {};

  useEffect(() => {
    userInfo();
  }, []);

  const context = {
    openSideBarHandler,
    user,
  };

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
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.shape({}).isRequired,
  }).isRequired,
  userInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ user: getUser(state) });

export default connect(mapStateToProps, { userInfo: getUserInfo })(
  AppContainer
);
