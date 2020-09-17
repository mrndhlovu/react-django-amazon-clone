/* eslint-disable comma-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable nonblock-statement-body-position */
import React from "react";
import { cleanup } from "@testing-library/react";
import { Formik } from "formik";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { customRenderWithContext as render } from "../../../test/utils/test.utils";
import { FORM_VALIDATION } from "../../constants/constants";
import { MainContext } from "../../utils/contextUtils";
import { THEME } from "../../../assets/theme/index";
import LoginPage from "./LoginPage";
import store from "../../store";

const DEFAULT_CONTEXT = {
  isSubmitting: jest.fn(),
  submitHandler: jest.fn(),
  listener: { isAuthenticated: false },
};

const LOGIN_INITIAL_STATE = {
  email: undefined,
  password: undefined,
};

afterEach(() => cleanup());

describe("Header", () => {
  const history = createMemoryHistory();
  const renderComponent = (Component, props, context = DEFAULT_CONTEXT) =>
    render(
      () => (
        <Provider store={store}>
          <ThemeProvider theme={THEME}>
            <Router history={history}>
              <Formik
                initialValues={LOGIN_INITIAL_STATE}
                validationSchema={FORM_VALIDATION}
                onSubmit={DEFAULT_CONTEXT.submitHandler}
              >
                <Component {...props} />
              </Formik>
            </Router>
          </ThemeProvider>
        </Provider>
      ),
      MainContext.Provider,
      context
    );

  it("should render login page correctly", () => {
    const { getByTestId, getByText } = renderComponent(LoginPage);

    getByTestId(/login-page-container/);
    getByTestId(/sign-in-form-logo/);
    getByTestId(/login-form/);
    getByTestId(/login-button/);
    getByText(/Continue/);
  });
});
