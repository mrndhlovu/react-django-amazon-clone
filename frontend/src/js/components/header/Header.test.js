/* eslint-disable comma-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable nonblock-statement-body-position */
import React from "react";
import { fireEvent, cleanup } from "@testing-library/react";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { customRenderWithContext as render } from "../../../test/utils/test.utils";
import { MainContext } from "../../utils/contextUtils";
import Header from "./Header";
import {
  _ACCOUNT_OPTIONS,
  _SEARCH_CATEGORIES,
} from "../../constants/constants";
import MenuList from "./MenuList";

const DEFAULT_CONTEXT = {
  openSideBarHandler: jest.fn(),
  handleSelectedOption: jest.fn(),
  listener: { data: {}, isAuthenticated: false },
};

afterEach(() => cleanup());

describe("Header", () => {
  const history = createMemoryHistory();
  const renderComponent = (Component, props, context = DEFAULT_CONTEXT) =>
    render(
      () => (
        <Router history={history}>
          <Component {...props} />
        </Router>
      ),
      MainContext.Provider,
      context
    );

  it("should render header, logo search bar and account links container", () => {
    const { getByTestId, getByText } = renderComponent(Header);

    getByTestId(/app-header/);
    getByTestId(/logo/);
    getByTestId(/nav-search-bar/);
    getByTestId(/nav-links-container/);
    getByText(/Account/);
    getByText(/& Orders/);
    getByText(/Prime/);
    getByTestId(/nav-cart-container/);
  });

  it("should click on menu button to open left side menu", () => {
    const { getByTestId } = renderComponent(Header);
    const menuButton = getByTestId(/nav-burger-menu/);

    fireEvent.click(menuButton);
    expect(DEFAULT_CONTEXT.openSideBarHandler).toHaveBeenCalledTimes(1);
  });

  it("should render dropdown, click link items and callback fired with correct arguments", () => {
    const DEFAULT_PROPS = {
      list: [],
      handleClick: jest.fn(),
    };

    const { getByText } = renderComponent(Header);

    const hoverAndSelect = async (hoverItem, props) => {
      const menuList = renderComponent(MenuList, props);
      const dropdownMenu = getByText(hoverItem);
      fireEvent.click(dropdownMenu);

      props.list.map((item) => {
        const linkItem = menuList.getByText(item?.header || item);
        fireEvent.click(linkItem);

        expect(DEFAULT_PROPS.handleClick).toHaveBeenCalledWith(
          item.redirect || item
        );
      });
    };

    hoverAndSelect("& Lists", {
      ...DEFAULT_PROPS,
      list: _ACCOUNT_OPTIONS.ACCOUNT,
    });

    hoverAndSelect("& Lists", {
      ...DEFAULT_PROPS,
      list: _ACCOUNT_OPTIONS.LISTS,
    });

    hoverAndSelect(/All/, {
      ...DEFAULT_PROPS,
      list: _SEARCH_CATEGORIES,
    });
  });
});
