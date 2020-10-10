/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./_header.scss";

import { Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";
import { Button } from "@material-ui/core";

import {
  PRODUCT_CATEGORIES,
  _ACCOUNT_OPTIONS,
} from "../../constants/constants";
import {
  AmazonButton,
  ShoppingCartCount,
  DropdownButton,
  AmazonLogo,
  UIHeader,
} from "../shared";

import { logoutAction } from "../../actions/AuthActions";
import { useMainContext, useFormInput } from "../../utils/hookUtils";
import MenuList from "./MenuList";
import NavLinkButton from "./NavLinkButton";
import AccountOptions from "./AccountOptions";

const Navigation = () => {
  const { openSideBarHandler } = useMainContext();
  const {
    auth: { isAuthenticated, data },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [inputData, handleChange] = useFormInput();
  const history = useHistory();
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSearch = (category) => {
    let searchParams;
    setActiveCategory(
      category === "All Departments" ? "All" : category || "Search"
    );
    searchParams =
      inputData?.search && `?search=${inputData?.search.toLowerCase()}`;

    if (inputData.search) {
      return history.replace(`/product-list${searchParams}`);
    }

    searchParams = `?category=${category.toLowerCase()}`;

    history.replace(
      category ? `/product-list${searchParams}` : "/product-list"
    );
  };

  return (
    <nav data-testid="app-header" className="nav__bar__container">
      <div className="nav__bar__left">
        <button
          data-testid="nav-burger-menu"
          className="nav__burger__menu"
          onClick={() => openSideBarHandler()}
          type="button"
        >
          <MenuIcon fontSize="large" />
        </button>
        <div
          className="logo__container"
          onClick={() => history.push("/")}
          onKeyDown={() => history.push("/")}
        >
          <AmazonLogo height="50" width="100" dataTestId="logo" />
        </div>
      </div>
      <div data-testid="nav-search-bar" className="nav__bar__center">
        <div className="nav__search">
          <div className="nav__search__left">
            <DropdownButton
              disablePortal
              arrow
              buttonText={() => (
                <span className="nav__search__button__text">
                  {activeCategory}
                </span>
              )}
              content={() => (
                <ul
                  data-testid="nav-search-category"
                  className="nav__search__categories"
                >
                  <MenuList
                    list={[{ value: "All Departments", key: "" }]}
                    handleClick={handleSearch}
                    link={false}
                  />

                  <MenuList
                    list={PRODUCT_CATEGORIES}
                    handleClick={handleSearch}
                    link={false}
                  />
                </ul>
              )}
              button
            />
          </div>
          <div className="nav__search__center">
            <input
              className="search__input"
              onChange={(e) => handleChange(e, "search")}
              onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : {})}
            />
          </div>
          <div className="nav__search__right">
            <Button type="button" onClick={() => handleSearch()}>
              <SearchIcon fontSize="large" />
            </Button>
          </div>
        </div>
      </div>
      <div data-testid="nav-links-container" className="nav__bar__right">
        <ul className="nav__links__container">
          <DropdownButton
            buttonText={() => (
              <NavLinkButton
                buttonText={`Hello, ${
                  isAuthenticated ? data?.full_name.split(" ")[0] : "Sign in"
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
              <div data-testid="try-prime" className="try__prime">
                <p>
                  Enjoy fast, free delivery on millions of eligible items when
                  you join Prime
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
        </ul>
      </div>
    </nav>
  );
};

export default memo(Navigation);
