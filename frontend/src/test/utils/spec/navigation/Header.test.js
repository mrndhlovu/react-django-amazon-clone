import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { MainContext } from "../../../../js/utils/contextUtils";
import Header from "../../../../js/components/Header";

const DEFAULT_PROPS = {
  openSideBarHandler: jest.fn(),
};

describe("Header", () => {
  let wrapper;

  const init = () => {
    wrapper = render(
      <MainContext.Provider value={DEFAULT_PROPS}>
        <Header />
      </MainContext.Provider>
    );
  };

  beforeEach(() => {
    init();
  });

  it("should render header, logo search bar and account links container", () => {
    const { getByTestId, getByText } = wrapper;

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
    const { getByTestId } = wrapper;
    const menuButton = getByTestId(/nav-burger-menu/);

    fireEvent.click(menuButton);
    expect(DEFAULT_PROPS.openSideBarHandler).toHaveBeenCalledTimes(1);
  });
});
