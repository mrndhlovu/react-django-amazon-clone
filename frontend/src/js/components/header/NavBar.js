import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Menu as MenuIcon } from "@material-ui/icons";

import { AmazonLogo } from "../shared";
import NavCenter from "./NavCenter";
import NavRight from "./NavRight";

const Container = styled.nav`
  background-color: ${({ theme }) => theme.colors.amazonDarkBlue};
  display: grid;
  grid-template-columns: 0fr 3fr 1fr;
  place-content: center;
  justify-items: start;
  height: 60px;
  align-items: center;
  left: 0;
  padding: 0 10px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  position: relative;

  @media (max-width: 1400px) {
    grid-template-columns: 15% 60% 25%;
  }

  @media (max-width: 1150px) {
    grid-template-columns: 16% 54% 30%;
  }

  @media (max-width: 845px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    height: 87px;

    background-color: ${({ theme }) => theme.colors.amazonMobile};
  }
`;

const NavLeft = styled.div`
  ${({ theme }) => theme.helpers.useFlex()};

  button {
    cursor: pointer;
    background: transparent;
    padding: 6px 0;
    border: 1px solid ${({ theme }) => theme.colors.white};
    border-radius: 3px;
    color: ${({ theme }) => theme.colors.white};
    width: 40px;
    ${({ theme }) => theme.helpers.useFlex()};

    svg {
      font-size: 26px;
    }
  }

  & > div:last-child {
    ${({ theme }) => theme.helpers.useFlex()};
    cursor: pointer;
    margin: 0 15px;
    width: 75px;
  }

  @media (max-width: 845px) {
    position: absolute;
    top: 5%;
    left: 10px;
    vertical-align: top;
    height: 30px;

    button {
      border: none;
      color: ${({ theme }) => theme.colors.black};
    }

    div:last-child {
      width: 85px;

      svg {
        padding-top: 5px;
        color: ${({ theme }) => theme.colors.black};
        path {
          fill: #000;
        }
      }
    }
  }

  @media (max-width: 255px) {
    div:last-child {
      display: none;
    }
  }
`;

const NavBar = ({ children }) => {
  return <Container data-testid="app-header">{children}</Container>;
};

NavBar.Left = ({ history }) => (
  <NavLeft>
    <button data-testid="nav-burger-menu" onClick={() => {}} type="button">
      <MenuIcon fontSize="large" />
    </button>
    <div onClick={() => history.push("/")} onKeyDown={() => history.push("/")}>
      <AmazonLogo height="50" width="100" dataTestId="logo" />
    </div>
  </NavLeft>
);

NavBar.Center = NavCenter;

NavBar.Right = NavRight;

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
};

NavBar.Left.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default NavBar;
