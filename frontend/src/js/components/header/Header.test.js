import React from "react";
import { fireEvent, cleanup } from "@testing-library/react";

import { customRenderWithContext as render } from "../../../test/utils/test.utils";
import { MainContext } from "../../utils/contextUtils";
import Header from "./Header";

const DEFAULT_CONTEXT = {
  openSideBarHandler: jest.fn(),
};

afterEach(() => cleanup());

describe("Header", () => {
  const renderComponent = (Component, props, context = DEFAULT_CONTEXT) =>
    render(() => <Component {...props} />, MainContext.Provider, context);

  it("should render header, logo search bar and account links container", () => {
    const { getByTestId, getByText } = renderComponent(Header);

    getByTestId(/app-header/);
    getByTestId(/logo/);
    getByTestId(/nav-search-bar/);
    getByTestId(/nav-links-container/);
    getByText(/Account & Lists/);
    getByText(/Returns & Orders/);
    getByText(/Try Prime/);
    getByTestId(/nav-cart-container/);
  });

  it("should click on menu button to open left side menu", () => {
    const { getByTestId } = renderComponent(Header);
    const menuButton = getByTestId(/nav-burger-menu/);

    fireEvent.click(menuButton);
    expect(DEFAULT_CONTEXT.openSideBarHandler).toHaveBeenCalledTimes(1);
  });
});
