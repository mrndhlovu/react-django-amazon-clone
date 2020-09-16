import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { MainContext } from "../utils/contextUtils";
import { getUserInfo, logout } from "../actions/AuthActions";
import { getUser } from "../components/selectors/authSelectors";

const AppContainer = ({ children, user, _userInfo, _logout }) => {
  const openSideBarHandler = () => {};

  useEffect(() => {
    _userInfo();
  }, [_userInfo]);

  const logoutHandler = () => _logout();

  const context = {
    openSideBarHandler,
    logoutHandler,
    listener: user,
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
  _userInfo: PropTypes.func.isRequired,
  _logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ user: getUser(state) });

export default connect(mapStateToProps, {
  _userInfo: getUserInfo,
  _logout: logout,
})(AppContainer);
