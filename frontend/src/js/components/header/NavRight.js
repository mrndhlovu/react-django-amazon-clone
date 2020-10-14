import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import { _ACCOUNT_OPTIONS } from "../../constants/constants";
import {
  AmazonButton,
  ShoppingCartCount,
  DropdownButton,
  UIHeader,
} from "../shared";
import { logoutAction } from "../../actions/AuthActions";
import AccountOptions from "./AccountOptions";
import MenuList from "./MenuList";
import NavLinkButton from "./NavLinkButton";

const Container = styled.div`
  color: ${({ theme }) => theme.colors.white};
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
  align-items: center;
  justify-items: center;

  span {
    ${({ theme }) => theme.helpers.useFlex("row", "flex-start")};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .nav__signin__container {
    ${({ theme }) => theme.helpers.useFlex("column")};

    width: 100%;
    padding: 15px;

    button {
      width: 80%;
    }

    & > div {
      padding-top: 5px;

      & > span:first-child {
        padding-right: 5px;
      }
    }

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.amazon};
      ${({ theme }) => theme.helpers.hoverText(theme.colors.amazon)};
    }
  }

  @media (max-width: 845px) {
    ${({ theme }) => theme.helpers.useFlex("row", "space-between", "flex-end")};
    width: fit-content;
    position: relative;

    & > span:nth-child(1),
    button:nth-child(2),
    span:nth-child(3) {
      display: none;
    }

    button:last-child {
      position: absolute;
      top: 0%;
      right: 10px;
      color: ${({ theme }) => theme.colors.black};
      span {
        color: ${({ theme }) => theme.colors.black};
      }
    }
  }
`;

const NavRight = ({ isAuthenticated, userData, dispatch }) => {
  const history = useHistory();

  return (
    <Container data-testid="nav-links-container">
      <DropdownButton
        buttonText={() => (
          <NavLinkButton
            buttonText={`Hello, ${
              isAuthenticated ? userData?.full_name.split(" ")[0] : "Sign in"
            }`}
            subText="Account & Lists"
            arrow
          />
        )}
        content={() => (
          <AccountOptions data-testid="account-options">
            {!isAuthenticated && (
              <AccountOptions.Header className="nav__signin__container">
                <AmazonButton
                  buttonText="Sign in"
                  handleClick={() => history.push("/login")}
                />
                <div>
                  <span>New Customer?</span>
                  <Link to="/register">Start here.</Link>
                </div>
              </AccountOptions.Header>
            )}
            <AccountOptions.Content className="nav__account__lists">
              <AccountOptions.Column>
                <UIHeader as="h3" content="Your Lists" />
                <MenuList list={_ACCOUNT_OPTIONS.LISTS} />
              </AccountOptions.Column>
              <AccountOptions.Column>
                <UIHeader as="h3" content="Your Account" />
                <MenuList list={_ACCOUNT_OPTIONS.ACCOUNT} />
                {isAuthenticated && (
                  <MenuList
                    list={_ACCOUNT_OPTIONS.AUTH}
                    handleClick={() => dispatch(logoutAction())}
                  />
                )}
              </AccountOptions.Column>
            </AccountOptions.Content>
          </AccountOptions>
        )}
      />

      <NavLinkButton
        redirectTo="/user-profile?flowId=orders"
        buttonText="Returns"
        subText="& Orders"
      />

      <DropdownButton
        buttonText={() => (
          <NavLinkButton buttonText="Try" subText="Prime" arrow />
        )}
        content={() => (
          <div userData-testid="try-prime" className="try__prime">
            <p>
              Enjoy fast, free delivery on millions of eligible items when you
              join Prime
            </p>
            <AmazonButton
              buttonText="Try Prime FREE"
              handleClick={() => history.push("/upgrade")}
            />
          </div>
        )}
        placement="bottom-start"
      />

      <ShoppingCartCount dataTestId="nav-cart-container" />
    </Container>
  );
};

export default NavRight;
