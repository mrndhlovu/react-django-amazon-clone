import React, { useEffect, memo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { getProductList } from "../actions/ProductActions";
import { getShoppingBasketAction } from "../actions/CartActions";
import { getUserAction } from "../actions/AuthActions";
import { MainContext } from "../utils/contextUtils";
import Header from "../components/header/Header";

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  @media (max-width: 845px) {
    padding-top: 0;
  }
`;

const AppContainer = ({ children }) => {
  const {
    auth: { isAuthenticated },
  } = useSelector((state) => state);
  const { search } = useLocation();

  const dispatch = useDispatch();

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
    if (!search) dispatch(getProductList());
  }, [dispatch, search]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getShoppingBasketAction());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <MainContext.Provider value={context}>
      <Header />
      <Container data-testid="app-container">{children}</Container>
    </MainContext.Provider>
  );
};

AppContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(AppContainer);
