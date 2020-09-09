import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./_header.scss";

import { Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";

import { Button, Divider } from "@material-ui/core";

import { _ACCOUNT_OPTIONS } from "../../constants/constants";
import { useMainContext, useFormInput } from "../../utils/hookUtils";
import AmazonLogo from "./AmazonLogo";
import DropdownButton from "../shared/DropdownButton";
import MenuList from "./MenuList";
import ShoppingCartCount from "../shared/ShoppingCartCount";

const Navigation = () => {
  const { openSideBarHandler, handleLogOut = () => {} } = useMainContext();
  const [, handleChange] = useFormInput();
  const history = useHistory();
  const [activeCategory, setActiveCategory] = useState("All");

  const selectedCategoryHandler = (category) => {
    setActiveCategory(category);
  };

  const handleSelectedOption = (option) => {
    if (option === "logout") return handleLogOut;
    return history.push(`/${option}`);
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
                <ul className="nav__search__categories">
                  <li
                    onClick={() => selectedCategoryHandler("All")}
                    onKeyDown={() => selectedCategoryHandler("All")}
                  >
                    All Departments
                  </li>

                  <MenuList
                    list={["Books", "Beauty", "Computers", "Electronics"]}
                    handleClick={selectedCategoryHandler}
                  />
                </ul>
              )}
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
          <DropdownButton
            contentText={() => (
              <>
                <div>Account</div>
                <span> & Lists </span>
              </>
            )}
            content={() => (
              <>
                <div className="nav__account__lists">
                  <ul className="lists__left first">
                    <h2>Your Lists</h2>
                    <Divider variant="fullWidth" />
                    <MenuList
                      list={_ACCOUNT_OPTIONS.LISTS}
                      handleClick={handleSelectedOption}
                    />
                  </ul>

                  <ul className="lists__right">
                    <h2>Your Account</h2>
                    <Divider variant="fullWidth" />
                    <MenuList
                      list={_ACCOUNT_OPTIONS.ACCOUNT}
                      handleClick={handleSelectedOption}
                    />
                  </ul>
                </div>
              </>
            )}
            link
          />

          <li
            onClick={() => history.push("/returns-orders")}
            onKeyDown={() => history.push("/returns-orders")}
          >
            <div>Returns</div>
            <span>& Orders</span>
          </li>

          <DropdownButton
            contentText={() => (
              <>
                <div>Try</div>
                <span> Prime</span>
              </>
            )}
            content={() => (
              <div className="try__prime">
                <p>
                  Enjoy fast, free delivery on millions of eligible items when
                  you join Prime
                </p>
                <button type="button" onClick={() => history.push("/upgrade")}>
                  <span>Try Prime FREE</span>
                </button>
              </div>
            )}
            link
            placement="bottom-start"
          />

          <li>
            <ShoppingCartCount dataTestId="nav-cart-container" count={0} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
