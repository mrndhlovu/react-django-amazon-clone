import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./_header.scss";

import { Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";

import { Button, Divider } from "@material-ui/core";

import { _ACCOUNT_OPTIONS } from "../../constants/constants";
import {
  AmazonButton,
  ShoppingCartCount,
  DropdownButton,
  AmazonLogo,
} from "../shared";
import { useMainContext, useFormInput } from "../../utils/hookUtils";

import MenuList from "./MenuList";
import NavLinkButton from "./NavLinkButton";

const Navigation = () => {
  const { openSideBarHandler, listener, logoutHandler } = useMainContext();
  const [, handleChange] = useFormInput();
  const history = useHistory();
  const [activeCategory, setActiveCategory] = useState("All");

  const selectedCategoryHandler = (category) => {
    setActiveCategory(category === "All Departments" ? "All" : category);
  };

  const handleSearch = () => {};

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
          <AmazonLogo dataTestId="logo" />
        </div>
      </div>
      <div data-testid="nav-search-bar" className="nav__bar__center">
        <div className="nav__search">
          <div className="nav__search__left">
            <DropdownButton
              disablePortal
              arrow
              contentText={() => (
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
                    list={["All Departments"]}
                    handleClick={selectedCategoryHandler}
                    link={false}
                  />

                  <MenuList
                    list={["Books", "Beauty", "Computers", "Electronics"]}
                    handleClick={selectedCategoryHandler}
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
            />
          </div>
          <div className="nav__search__right">
            <Button onClick={handleSearch}>
              <SearchIcon fontSize="large" />
            </Button>
          </div>
        </div>
      </div>
      <div data-testid="nav-links-container" className="nav__bar__right">
        <ul className="nav__links__container">
          <li>
            <DropdownButton
              contentText={() => (
                <NavLinkButton
                  redirectTo={history.location.pathname}
                  buttonText="Account"
                  subText="& Lists"
                  arrow
                />
              )}
              content={() => (
                <div data-testid="account-options">
                  {!listener.isAuthenticated && (
                    <div className="nav__signin__container">
                      <AmazonButton
                        buttonText="Sign in"
                        handleClick={() => history.push("/login")}
                      />
                      <div>
                        <span>New Customer?</span>
                        <Link to="/register">Start here.</Link>
                      </div>
                    </div>
                  )}
                  <div className="nav__account__lists">
                    <ul className="lists__left first">
                      <h2>Your Lists</h2>
                      <Divider variant="fullWidth" />
                      <MenuList list={_ACCOUNT_OPTIONS.LISTS} />
                    </ul>

                    <ul className="lists__right">
                      <h2>Your Account</h2>
                      <Divider variant="fullWidth" />
                      <MenuList list={_ACCOUNT_OPTIONS.ACCOUNT} />
                      <MenuList
                        list={_ACCOUNT_OPTIONS.AUTH}
                        handleClick={logoutHandler}
                      />
                    </ul>
                  </div>
                </div>
              )}
            />
          </li>

          <li>
            <NavLinkButton
              redirectTo="return-orders"
              buttonText="Returns"
              subText="& Orders"
            />
          </li>
          <li>
            <DropdownButton
              contentText={() => (
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
          </li>
          <li>
            <ShoppingCartCount dataTestId="nav-cart-container" count={0} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
