import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { MainContext } from "../utils/contextUtils";
import {
  getUserInfo,
  logout,
  resetChangePasswordFlow,
} from "../actions/AuthActions";
import { clearAlert } from "../actions/AppActions";
import { getUser, userAlert } from "../components/selectors/authSelectors";

const AppContainer = ({
  children,
  user,
  _userInfo,
  _logout,
  uiAlert,
  _clearAlert,
  _resetChangePasswordFlow,
}) => {
  const openSideBarHandler = () => {};

  const logoutHandler = () => _logout();

  useEffect(() => {
    _userInfo();
  }, [_userInfo]);

  const context = {
    openSideBarHandler,
    logoutHandler,
    listener: user,
    uiAlert,
    _clearAlert,
    _resetChangePasswordFlow,
  };

  return (
    <MainContext.Provider value={context}>
      <div className="app__container" data-testid="app-container">
        {children}
      </div>
    </MainContext.Provider>
  );
};

AppContainer.defaultProps = {
  uiAlert: {},
};

AppContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  uiAlert: PropTypes.shape({ message: PropTypes.string }),
  _clearAlert: PropTypes.func.isRequired,
  _resetChangePasswordFlow: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.shape({}).isRequired,
  }).isRequired,
  _userInfo: PropTypes.func.isRequired,
  _logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
  uiAlert: userAlert(state),
});

export default connect(mapStateToProps, {
  _userInfo: getUserInfo,
  _clearAlert: clearAlert,
  _logout: logout,
  _resetChangePasswordFlow: resetChangePasswordFlow,
})(AppContainer);
