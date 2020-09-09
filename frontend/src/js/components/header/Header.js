import React from "react";
import "./_header.scss";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

import { useMainContext } from "../../utils/hookUtils";
import AmazonLogo from "./AmazonLogo";
import ShoppingCartCount from "../shared/ShoppingCartCount";
import DropdownLink from "../shared/DropdownLink";
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
              content={() => (
                <span className="nav__search__button__text">All</span>
              )}
            >
              <div>Search categories</div>
            </DropdownButton>
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
          <DropdownLink
            content={() => (
              <>
                <div>Account</div>
                <span> & Lists </span>
              </>
            )}
          >
            <div>Returns and orders</div>
          </DropdownLink>

          <DropdownLink
            content={() => (
              <>
                <div>Returns</div>
                <span>& Orders</span>
              </>
            )}
          >
            <div>Returns and orders</div>
          </DropdownLink>

          <DropdownLink
            as="li"
            content={() => (
              <>
                <div>Try</div>
                <span> Prime</span>
              </>
            )}
          >
            <div>Returns and orders</div>
          </DropdownLink>

          <li>
            <ShoppingCartCount dataTestId="nav-cart-container" count={0} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
