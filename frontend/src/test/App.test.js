import React from "react";
import { render } from "@testing-library/react";

import App from "../js/App";

describe("App Container", () => {
  it("should render the app content without error.", async () => {
    const { getByTestId } = render(<App />);

    getByTestId(/app-container/);
    getByTestId(/home-page/);
  });
});
