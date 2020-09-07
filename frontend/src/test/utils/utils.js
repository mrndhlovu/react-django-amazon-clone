export const MOCK_LOCATION_PROPS = {
  pathname: "/",
  hash: "",
  search: "",
  state: "",
};

export const MOCK_HISTORY_PROPS = {
  push: jest.fn(),
};

export const findByDataTestId = (component, id) =>
  component.find(`[data-test-id="${id}"]`);

export const mockWindowObject = (pathname) => {
  global.window = Object.create(window);

  Object.defineProperty(window, "location", {
    value: {
      pathname,
    },
  });
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
