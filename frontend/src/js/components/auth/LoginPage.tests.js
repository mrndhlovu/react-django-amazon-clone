/* eslint-disable comma-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable nonblock-statement-body-position */
import React from "react";
import { cleanup } from "@testing-library/react";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { customRenderWithContext as render } from "../../../test/utils/test.utils";
import { MainContext } from "../../utils/contextUtils";
import LoginPage from "./LoginPage";

const DEFAULT_CONTEXT = {
  isSubmitting: jest.fn(),
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

  it("should render loginpage correctly", () => {
    const { getByTestId } = renderComponent(LoginPage);

    getByTestId(/login-page-container/);
    getByTestId(/login-page-logo/);
    getByTestId(/login-form/);
    getByTestId(/login-button/);
  });
});
