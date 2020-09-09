import React from "react";
import "./_header.scss";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

import { useMainContext } from "../../utils/hookUtils";
import AmazonLogo from "./AmazonLogo";
import ShoppingCartCount from "../shared/ShoppingCartCount";
import DropdownButton from "../shared/DropdownButton";

const Navigation = () => {
  const { openSideBarHandler } = useMainContext();

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
        <div data-testid="logo" className="logo__container">
          <AmazonLogo />
        </div>
      </div>
      <div data-testid="nav-search-bar" className="nav__bar__center">
        <div className="nav__search">
          <div className="nav__search__left">
            <DropdownButton
              disablePortal
              arrow
              contentText={() => (
                <span className="nav__search__button__text">All</span>
              )}
              content={() => (
                <div className="nav__search__categories">Search categories</div>
              )}
            />
          </div>
          <div className="nav__search__center">
            <input className="search__input" />
          </div>
          <div className="nav__search__right">
            <Button>
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
            content={() => <div>Returns and orders</div>}
            link
          />

          <li>
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
            content={() => <div>Returns and orders</div>}
            link
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
