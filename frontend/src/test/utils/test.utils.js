import React from "react";
import { render } from "@testing-library/react";

export const MOCK_LOCATION_PROPS = {
  pathname: "/",
  hash: "",
  search: "",
  state: "",
};

export const MOCK_HISTORY_PROPS = {
  push: jest.fn(),
};

export const customRenderWithContext = (UI, Provider, contextValue) => {
  const Component = (props) => <UI {...props} />;

  return render(
    <Provider value={{ ...contextValue }}>
      <Component />
    </Provider>,
  );
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
