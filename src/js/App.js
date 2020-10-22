import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import AppContainer from "./containers/AppContainer";
import BaseRouter from "./Routes";
import store from "./store";
import { THEME } from "../assets/theme/index";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={THEME}>
        <AppContainer>
          <BaseRouter />
        </AppContainer>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
